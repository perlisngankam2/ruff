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
import { ParameterService } from '../parameter/parameter.service';

@Injectable()
export class TrancheStudentService {
    constructor(
        @InjectRepository(TrancheStudent)
        private trancheStudentRepository: EntityRepository<TrancheStudent>,
        @Inject(forwardRef(() => AvanceTrancheService))
        private avance: AvanceTrancheService,
        @Inject(forwardRef(() => TrancheService))
        private trancheService: TrancheService,
        @Inject(forwardRef(() => StudentService))
        private studentService: StudentService,
        private twilioService: TwilioService,
        private parameterservice: ParameterService,
        private  em: EntityManager,
      ) {}
    
    async create(
        input: TrancheStudentCreateInput,
      ): Promise<TrancheStudent> {  
        const trancheStudent = new TrancheStudent()
        const student = await this.studentService.findByOne({id:input.studentId})
        const tranche = await this.studentService.findByOne({id:input.trancheid})
        const anneAcademique = String((await this.avance.findByStudent(input.studentId)).map(async a=>(await a.anneeAcademique.load()).id)[0])
 
        const year = await this.parameterservice.getAll()
        const annee = year[year.length-1].year
        wrap(trancheStudent).assign(
            {
            montant: 0.000000,
            //  montant: input.montant,
             name: input.name,
             description: input.description,
            //  regimePaimemnt: input.regimePaiement,
             tranche: tranche.id,
             student: student.id,
             year: annee
             
             
            },
            {
                em:this.em
            }
        )

        await this.trancheStudentRepository.persistAndFlush(trancheStudent)  
        return trancheStudent
      }
    
    findByOne(filters: FilterQuery<TrancheStudent>): Promise<TrancheStudent | null> {
        return this.trancheStudentRepository.findOne(filters);
      }

    // async findBystudent(id: string): Promise<TrancheStudent[] | null> {
    //     return await this.trancheStudentRepository.find({student:id});
    //   }

    async findByStudents(studentid: string): Promise<TrancheStudent[] | null> {
        // return this.trancheStudentRepository.find({student:id});
        const where = {};
      if (studentid) {
        where['student'] = studentid;
      }
      
      const a = await this.em.find(TrancheStudent, where, {
        populate: true,
        orderBy: { id: 'ASC' },
      });
      
      return a
            }

    async findTrancheByStudent(studentid:string){
     return (await this.findByStudents(studentid)).map(a=>a.tranche.load())
    }

    findByTrancheandStudent(studentid: string,trancheid:string): Promise<TrancheStudent | null> {
        return this.trancheStudentRepository.findOne({student:studentid,tranche:trancheid});
      }
   
    findById(id:string){
        return this.trancheStudentRepository.findOne(id)
    }
    
    getAll(): Promise<TrancheStudent[]> {
        return this.trancheStudentRepository.findAll()
    }

    async updatesaveTrancheStudent(input:string){
      const trancheStudent= await this.getAll()
      trancheStudent.forEach((parameter) => {
          parameter.year= input;
          this.trancheStudentRepository.persist(parameter);
        });
        
        await this.trancheStudentRepository.flush();
    }

async saveTranche(studentid:string,trancheid:string){
        const tranchestudent = await this.findByTrancheandStudent(studentid,trancheid)
        // const anneAcademique =(await this.avance.findByStudent(studentid)).map(async a=>(await a.anneeAcademique.load()).id)[0]
 

        if(tranchestudent!=null)
        {
        const tranche = await this.trancheService.findByOne(trancheid)
        console.log("====================>"+tranchestudent)
        console.log("+++++++++++++++++++++++>"+tranchestudent.montant)
        const montant =(await this.avance.SumAvanceTrancheByStudent(studentid,trancheid))
        console.log("===================================>"+montant)
        tranchestudent.montant=montant
        const student = tranchestudent.student.load()
        console.log("===================================>"+student)
       
        
        
        if(tranchestudent.montant == tranche.montant){
            tranchestudent.complete = true
            // tranche.regimePaimemnt = RegimePaiement.NORMAL
            tranchestudent.reste = 0.0
        }

        if(tranchestudent.montant > tranche.montant){
            tranchestudent.complete = true
            // tranche.regimePaimemnt = RegimePaiement.NORMAL
            tranchestudent.surplus = tranchestudent.montant -tranche.montant
        }   

        if(tranchestudent.montant < tranche.montant){
            tranchestudent.complete = false
            tranchestudent.reste = tranche.montant - tranchestudent.montant
        }
        
        await this.trancheStudentRepository.persistAndFlush(tranchestudent)
        return tranchestudent
    }

    if(tranchestudent==null)
        {
        const tranchestudent = new TrancheStudent()
        

        const year = await this.parameterservice.getAll()
        const annee = year[year.length-1].year
        wrap(tranchestudent).assign({
            montant:0.00000,
            student:studentid,
            tranche:trancheid,
            year : annee     
        },
        {
            em:this.em
        })
        await this.trancheStudentRepository.persistAndFlush(tranchestudent)
        const tranche = await this.trancheService.findByOne(trancheid)
        console.log("====================>"+tranchestudent)
        console.log("+++++++++++++++++++++++>"+tranchestudent.montant)
        const montant =(await this.avance.SumAvanceTrancheByStudent(studentid,trancheid))
        console.log("===================================>"+montant)
        tranchestudent.montant=montant
        const student = tranchestudent.student.load()
        console.log("===================================>"+student)
       
        
        
        if(tranchestudent.montant == tranche.montant){
            tranchestudent.complete = true
            // tranche.regimePaimemnt = RegimePaiement.NORMAL
            tranchestudent.reste = 0.0
        }

        if(tranchestudent.montant > tranche.montant){
            tranchestudent.complete = true
            // tranche.regimePaimemnt = RegimePaiement.NORMAL
            tranchestudent.surplus = tranchestudent.montant -tranche.montant
        }   

        if(tranchestudent.montant < tranche.montant){
            tranchestudent.complete = false
            tranchestudent.reste = tranche.montant - tranchestudent.montant
        }
        
        await this.trancheStudentRepository.persistAndFlush(tranchestudent)
        return tranchestudent
    }
        
    }
      
    async update(id:string, input: TrancheStudentUpdateInput): Promise<TrancheStudent> {
        const trancheStudent = await this.findById(id)
        
 
        const year = await this.parameterservice.getAll()
        const annee = year[year.length-1].year
        wrap(trancheStudent).assign({
            name:input.name || trancheStudent.name,
            montant: input.montant || trancheStudent.montant,
            description: input.description || trancheStudent.description,
            year: annee
        },
        { em: this.em },
        );
        await this.trancheStudentRepository.persistAndFlush(trancheStudent);
        return trancheStudent;
    }

    
    // async AmountRecentTranchestudentByStudent(studentid:string){
        
    //     const b  = (await this.findByStudent(studentid))
    //     const a  = b[b-1]
    //     return a
        
    // }

    async delete(id:string){
    const a = this.findById(id)
    await this.trancheStudentRepository.removeAndFlush(await a)
    if(!a){
    throw Error("not found")
    }
    return a
    }
    
    async findStudentByTrancheStudent(studentid:string){
        return (await this.em.find(TrancheStudent,{student:studentid}))[0].student.load()
      } 

      async findbystudentresttranche(studentid:string){
        const a= (await this.findByStudents(studentid)).map(async a=>(await a.tranche.load()).name)
        const b= (await this.findByStudents(studentid)).map(async a=> (await a.tranche.load()).priority)
        const c= (await this.findByStudents(studentid)).map(a=>a.reste)
        return [a,b,c]
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
// async createAlerteTranche(tranche:TrancheStudent){
//     const avanceTranche = tranche.avancheTranche.matching({})
//     const reste = avanceTranche[-1].reste
//     if(tranche.complete == false){
//         const dateLine = (await tranche.tranche.load()).dateLine
//         const alertDate = dateLine.setDate(dateLine.getDate()-2)

//         const toDay = new Date().getTime()

//         const student = tranche.student.load()
//         const parent = (await student).user.load()

//         if(toDay === alertDate ){
//             // create alert to parent 
//             this.twilioService.client.messages.create({
//                 body: "vous êtes prier de passer solder"+ tranche.name +"de votre enfant nome" + (await parent).name + "donc le reste est de"+reste,
//                 from: "+237647476798" ,
//                 to: (await parent).phoneNumber,
//               });
//         }

//     }
// }
