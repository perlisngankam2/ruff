/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    EntityManager,
    FilterQuery,
    NotFoundError,
    wrap,
  } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { verify } from 'crypto';
import { TwilioService } from 'nestjs-twilio';
import { AvanceTranche } from 'src/entities/avance-tranche.entity';
import { RegimePaiement, TrancheStudent } from 'src/entities/tranche-student.entity';
import { Tranche } from 'src/entities/tranche.entity';
import { AvanceTrancheService } from '../avance_tranche/avance-tranche.service';
import { StudentService } from '../student/student.service';
import { TrancheService } from '../tranche/tranche.service';
import { TrancheStudentCreateInput } from './dto/tranche-student.input';
import { TrancheStudentUpdateInput } from './dto/tranche-student.update';

@Injectable()
export class TrancheStudentService {
    constructor(
        @InjectRepository(TrancheStudent)
        private trancheStudentRepository: EntityRepository<TrancheStudent>,
        @Inject(forwardRef(() => AvanceTrancheService))
        private avance: AvanceTrancheService,
        private trancheService: TrancheService,
        private studentService: StudentService,
        private twilioService: TwilioService,
        private  em: EntityManager,
      ) {}
    
    async create(
        input: TrancheStudentCreateInput,
      ): Promise<TrancheStudent> {  
        const trancheStudent = new TrancheStudent()

        const tranche = input.tranche
            ? await this.trancheService.findByOne({id:input.tranche_id})
            : await this.trancheService.create(input.tranche)
        
        const student = input.student
            ? await this.studentService.findByOne({id:input.student_id})
            : await this.studentService.create(input.student)

        const a= 


        wrap(trancheStudent).assign(
            {
             montant: Number(input.montant) || 0.0,
             name: input.name,
             description: input.description,
             regimePaimemnt: input.regimePaiement,
             tranche: tranche.id,
             student: student.id
            },
            {
                em:this.em
            }
        )

        if(input.montant<tranche.montant){
            trancheStudent.complete=false
            await this.trancheStudentRepository.persistAndFlush(trancheStudent)  
            return trancheStudent       
        }
        if(input.montant > tranche.montant){
           trancheStudent.complete = true
           trancheStudent.reste = input.montant - tranche.montant
           await this.trancheStudentRepository.persistAndFlush(trancheStudent)  
           return trancheStudent  
        }

        trancheStudent.complete = true
        await this.trancheStudentRepository.persistAndFlush(trancheStudent)  
        return trancheStudent
      }
    
    findByOne(filters: FilterQuery<TrancheStudent>): Promise<TrancheStudent | null> {
        return this.trancheStudentRepository.findOne(filters);
      }

    findById(id:string){
        return this.trancheStudentRepository.findOne(id)
    }
    
    getAll(): Promise<TrancheStudent[]> {
        return this.trancheStudentRepository.findAll()
    }

    async createAlerteTranche(tranche:TrancheStudent){
        const avanceTranche = tranche.avancheTranche.matching({})
        const reste = avanceTranche[-1].reste
        if(tranche.complete == false){
            const dateLine = (await tranche.tranche.load()).dateLine
            const alertDate = dateLine.setDate(dateLine.getDate()-2)

            const toDay = new Date().getTime()

            const student = tranche.student.load()
            const parent = (await student).user.load()

            if(toDay === alertDate ){
                // create alert to parent 
                this.twilioService.client.messages.create({
                    body: "vous êtes prier de passer solder"+ tranche.name +"de votre enfant nome" + (await parent).name + "donc le reste est de"+reste,
                    from: "+237647476798" ,
                    to: (await parent).phoneNumber,
                  });
            }

        }
    }

    async saveTranche(id:string){
        const tranche = await this.trancheStudentRepository.findOneOrFail(id)
        tranche.montant = Number((await this.em.find(AvanceTranche,{trancheStudent: id})).map(a=>a.montant).reduce(function(a,b){return a+b}))
        const student = tranche.student.load()
        const categorie = (await student).categorie.load()
        const retenu = (await categorie).reductionScolarite.load()

        
        if((await retenu).pourcentage != 0){
            const new_amount_tranche =(await tranche.tranche.load()).montant - (await retenu).pourcentage*(await tranche.tranche.load()).montant
            if(tranche.montant >= new_amount_tranche && tranche.regimePaimemnt === "NORMAL"){
                tranche.complete = true
                tranche.reste = new_amount_tranche - tranche.montant
            }
            if(tranche.montant >= new_amount_tranche && tranche.regimePaimemnt === "SPECIAL"){
                tranche.complete = true
                tranche.regimePaimemnt = RegimePaiement.NORMAL
                tranche.reste = new_amount_tranche - tranche.montant
            }
            
          }

        if((await retenu).montant != 0 ){
            const new_amount_tranche =(await tranche.tranche.load()).montant - (await retenu).montant 
            if(tranche.montant >= new_amount_tranche ){
                tranche.complete = true
                tranche.reste = new_amount_tranche - tranche.montant
               
            }
            if(tranche.montant >= new_amount_tranche){
                tranche.complete = true
                tranche.regimePaimemnt = RegimePaiement.NORMAL
                tranche.reste = new_amount_tranche - tranche.montant
            }
        }
        
        if(tranche.montant == (await tranche.tranche.load()).montant){
            tranche.complete = true
            tranche.regimePaimemnt = RegimePaiement.NORMAL
            tranche.reste = 0.0
        }

        if(tranche.montant > (await tranche.tranche.load()).montant){
            tranche.complete = true
            tranche.regimePaimemnt = RegimePaiement.NORMAL
            tranche.reste = tranche.montant - Number((await tranche.tranche.load()).montant)
        }   

        if(tranche.montant < (await tranche.tranche.load()).montant){
            tranche.complete = false
            tranche.reste = 0.0
        }
        
        await this.trancheStudentRepository.persistAndFlush(tranche)
        return tranche
        
    }
      
    async update(id:string, input: TrancheStudentUpdateInput): Promise<TrancheStudent> {
        const trancheStudent = await this.findById(id)
        if (input.tranche) {
            const tranche =
            input.tranche_id &&
              (await this.trancheService.findByOne({ id: input.tranche_id}));
      
            if (!tranche) {
              throw new NotFoundError('tranche no exist' || '');
            }
            this.trancheService.update(tranche.id, input.tranche);
        }

        if (input.student) {
            const student =
            input.student_id &&
              (await this.studentService.findByOne({ id: input.student_id }));
      
            if (!student) {
              throw new NotFoundError('student no exist' || '');
            }
            this.studentService.update(student.id, input.student);
        }
 
        wrap(trancheStudent).assign({
            name:input.name || trancheStudent.name,
            montant: input.montant || trancheStudent.montant,
            description: input.description || trancheStudent.description,
        },
        { em: this.em },
        );
        await this.trancheStudentRepository.persistAndFlush(trancheStudent);
        return trancheStudent;
    }

    //  tous les etudiants etant à jour
    // async AllStudentComplet(){
    //     const student = await this.trancheStudentRepository
    // }

    // tous les etudiants n'etant pas à jour


    // montant attendu par section et cycle 


    // tous les avance d'une tranches

    async delete(id:string){
    const a = this.findById(id)
    await this.trancheStudentRepository.removeAndFlush(a)
    if(!a){
    throw Error("not found")
    }
    return a
    }

}

// const Tranchestudent = await this.findByOne({
//     tranche: trancheStudent.tranche,
//     student: trancheStudent.student
// })

// const reduction = (await student.categorie.load()).reductionScolarite
// const amount = (await reduction.load())

// if(amount.pourcentage){
//     const new_tranche_amount = tranche.montant - (amount.pourcentage*tranche.montant)
//     if(trancheStudent.montant == new_tranche_amount && trancheStudent.regimePaimemnt === "NORMAL"){
//         trancheStudent.complete = true
//         await this.trancheStudentRepository.persistAndFlush(trancheStudent)
//     }else{
//         if(trancheStudent.montant !== new_tranche_amount && trancheStudent.regimePaimemnt === "SPECIAL" ){
//             // GENERATE AVANCE TRANCHE 
//             const avance = await this.avance.saveAvanceTranche(Tranchestudent.id,new_tranche_amount)
//             if(avance.reste == 0){
//                 trancheStudent.complete = true
//             }
//             await this.trancheStudentRepository.persistAndFlush(trancheStudent)
//         }
//         // create the avance tranche
//         await this.avance.saveAvanceTranche(Tranchestudent.id,new_tranche_amount)
//         await this.trancheStudentRepository.persistAndFlush(trancheStudent)
//         //create the alert with twiolio   
//     }
// }

// const new_tranche_amount = tranche.montant - amount.montant
//     if(trancheStudent.montant === new_tranche_amount && trancheStudent.regimePaimemnt === "NORMAL"){
//         trancheStudent.complete = true
//         await this.trancheStudentRepository.persistAndFlush(trancheStudent)
//     }else{
//         if(trancheStudent.montant !== new_tranche_amount && trancheStudent.regimePaimemnt === "SPECIAL" ){
//             // GENERATE AVANCE TRANCHE 
//             await this.avance.saveAvanceTranche(Tranchestudent.id,new_tranche_amount)
//             await this.trancheStudentRepository.persistAndFlush(trancheStudent)
//         }
//         // create the avance tranche
//         await this.avance.saveAvanceTranche(Tranchestudent.id,new_tranche_amount)
//         await this.trancheStudentRepository.persistAndFlush(trancheStudent)

//         //create the alert
// }