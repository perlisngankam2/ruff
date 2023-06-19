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
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Pension } from 'src/entities/pension.entity';
import { Tranche } from 'src/entities/tranche.entity';
import { AnneeAccademiqueService } from '../anne_accademique/anne-accademique.service';
import { PensionService } from '../pension/pension.service';
import { SalleService } from '../salle/salle.service';
import { TrancheCreateInput } from './dto/tranche.input';
import { TrancheUpdateInput } from './dto/tranche.update';
import { format } from 'date-fns';
import { ParameterService } from '../parameter/parameter.service';
import { StudentService } from '../student/student.service';
import { TrancheStudentService } from '../tranche-student/tranche-student.service';
import { TranchStatTwo, TrancheStat, TrancheStatNotPayed, TrancheStatNotReceived} from '../statistics/classStatistics';
import { PensionSalleService } from '../pensionsalle/pensionsalle.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Role } from '../auth/roles/roles';
import { Roles } from '../auth/decorators/roles.decorator';



@Injectable()
export class TrancheService {
    constructor(
        @InjectRepository(Tranche)
        private trancheRepository: EntityRepository<Tranche>,
        private parameterservice: ParameterService,
        @Inject(forwardRef(()=>StudentService))
        private studentservice: StudentService,
        private tranchestudentservice: TrancheStudentService,
        private Pensionsalleservice:PensionSalleService,
        private salleservice: SalleService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: TrancheCreateInput,
      ): Promise<Tranche> {  
        const tranche = new Tranche()

        // const pension = input.pension
        // ? await this.pensionService.findByOne(input.pension_id)
        // : await this.pensionService.create(input.pension) 
        const salle =  await this.salleservice.findByOne({id:input.salleId})

        
        const year = await this.parameterservice.getAll()
        const annee = year[year.length-1].anneeAcademiqueName
        wrap(tranche).assign(
          {
            montant: input.montant,
            name: input.name,
            description: input.description,
            // dateLine:format(input.dateLine, 'dd/MM/yyyy'),
            dateLine:input.dateLine,
            anneAcademique: annee,
            salle: salle,
            // year: annee,
            priority: input.priority

            // tranchepriority: input.tranchePriorityId
            
            // pension: pension.id
          },
          {
            em:this.em
          }
        )
        const a= (await this.getAll()).map(a=>a.montant)
        const pension = ((await this.Pensionsalleservice.getAll()).filter(a=>a.salleId==input.salleId)).map(a=>a.montantPension)[0]
        if(a.length>0){
          const c=a.reduce(function(a,b){return a+b})
          if((c+input.montant)>pension){
            throw Error("!!!!!!!!montant de la pension pour cette salle a ete depasser veuillez entrer un montant valide!!!!!!!!!!!!")
          }
          await this.trancheRepository.persistAndFlush(tranche)
          return tranche
        }
        
        await this.trancheRepository.persistAndFlush(tranche)
        return tranche
      }
    
      findByOne(filters: FilterQuery<Tranche>): Promise<Tranche | null> {
        return this.trancheRepository.findOne(filters);
      }

      findBysalle(salleid:string) {
        return this.trancheRepository.find({salle:salleid});
      }

      findById(id:string){
        return this.trancheRepository.findOne(id)
      }
    
      getAll(): Promise<Tranche[]> {
        return this.trancheRepository.findAll({
          populate:true
        })
      }

     

      async getAllTranche(): Promise<Tranche[]> {
        return await this.trancheRepository.findAll({
          populate:['trancheStudent.tranche','trancheStudent.student']
        })
        // const b= a.map(a=>a.trancheStudent.l)
      }
      
      async update(id:string, input: TrancheUpdateInput): Promise<Tranche> {
        const tranche= await this.findById(id)
        // if (input.pension) {
        //     const pension =
        //     input.pension_id &&
        //       (await this.pensionService.findByOne({ id: input.pension_id }));
      
        //     if (!pension) {
        //       throw new NotFoundError('pension no exist' || '');
        //     }
        //     this.pensionService.update(pension.id, input.pension);
        //   }
        const year = await this.parameterservice.getAll()
        const annee = year[year.length-1].anneeAcademiqueName
        wrap(tranche).assign({
            name:input.name || tranche.name,
            montant: input.montant || tranche.montant,
            anneAcademique: annee,
            description: input.description || tranche.description,
            dateLine:format(input.dateLine,'dd/MM/yyyy'),
            priority: input.priority || tranche.priority,
            // tranchepriority:input.tranchePriorityId
        },
        { em: this.em },
    );
        await this.trancheRepository.persistAndFlush(tranche);
        return tranche;
      }

      async updatesaveTranche(input:string){
        const parameter= await this.getAll()
        parameter.forEach((parameter) => {
            parameter.anneAcademique= input;
            this.trancheRepository.persist(parameter);
          });
          
          await this.trancheRepository.flush();
      }
      
      async delete(id:string){
        const a = await this.findById(id) 
        await this.trancheRepository.nativeDelete(await a)
        if(!a){
        throw Error("not found")
      }
        return a 
      }  
      
     
      async trancheNotYetPayedByStudent(studentId:string){
        const students = await this.studentservice.getAll()
        const listalltranche = students.filter(a=>a.id===studentId).map(a=>a.salle.getEntity().tranche.getItems()).flat()
        console.log('======a'+listalltranche)
        const tranchepayed = students.filter(a=>a.id===studentId).map((student) => student.trancheStudent.getItems().map((trancheStudent) => trancheStudent.tranche)).flat()
        console.log('======>tranchepayed'+tranchepayed)
        const trancheNotYetPayed = listalltranche.filter((tranche) => {
          return !tranchepayed.some((tranchePayed) => tranchePayed.id === tranche.id);
        });
        const result: TrancheStatNotPayed[] = [];
        for(const a of trancheNotYetPayed){
          const studentid=studentId
          const Nom=a.name
          const Priority=a.priority
          const Rest = a.montant

          result.push({
            studentid,
            Nom,
            Priority,
            Rest
          });
        }
      
        return result;
      }

      async trancheNotYetReceivedByStudent(studentId:string){
         const a = await this.trancheNotYetPayedByStudent(studentId)
         const result: TrancheStatNotReceived[] = [];
         for(const b of a){
          const studentid=studentId
          const Nom=b.Nom
          const Priority=b.Priority
          const montantPercu = 0
         

          result.push({
            studentid,
            Nom,
            Priority,
            montantPercu
          });
        }

        return result
      }

      async findByStudentRestTranche(studentid:string){
       
        const trancheNotPayed  = await this.trancheNotYetPayedByStudent(studentid)
        console.log('========>trancheNotPayed'+trancheNotPayed)
        const students = await this.studentservice.getAll()
        const Tranches = students.map((student) => student.trancheStudent.getItems().map((trancheStudent) => trancheStudent.tranche));

        const tranches = await Promise.all(Tranches.flat().map((tranche) => this.trancheRepository.findOne(tranche.id, { populate: ['trancheStudent'] })));
      
        console.log("==============>"+tranches)
        
        const result: TrancheStat[] = [];
      
        for (const student of students) {
          const studentid = student.id
          for (const tranche of tranches) {
            const Nom = tranche.name;
            const Priority = tranche.priority;
            // const trancheNotPayed = a
            // console.log("=====>second_a"+trancheNotPayed)
            const trancheStudent = tranche.trancheStudent.getItems()
            .filter(async a=>(await a.tranche.load()).id===tranche.id);
            console.log('tranchestudent=======>'+trancheStudent)
            if (trancheStudent.length==0) break;
      
            for(const trancheStd of trancheStudent){
              const restObject = await this.tranchestudentservice.findRestByTrancheAndStudent(studentid, trancheStd.tranche.id);
              const Rest = restObject ? restObject.reste || 0 : 0;
            console.log('==========>rest'+Rest)

            result.push({
              studentid,
              Nom,
              Priority,
              Rest,
              trancheNotPayed
            });
          }
        }
        }

        return result.filter(a=>a.studentid===studentid);

      }

  async findByStudentAmountReceivedTranche(studentid:string){
    const students = await this.studentservice.getAll()
    const trancheNotPayed  = await this.trancheNotYetReceivedByStudent(studentid)
    const Tranches = students.map((student) => student.trancheStudent.getItems().map((trancheStudent) => trancheStudent.tranche));
    
    // const Tranches = students.map((student) => student.salle.getEntity().tranche.getItems()).map((trancheStudent) => trancheStudent.tranche));
    console.log('=======>tranche_unnnnnn'+Tranches)

    const tranches = await Promise.all(Tranches.flat().map((tranche) => this.trancheRepository.findOne(tranche.id, { populate: ['trancheStudent'] })));
  
    console.log("==============>pp"+tranches)
    
    const result: TranchStatTwo[] = [];
  
    for (const student of students) {
      const studentid = student.id
      const studentTrancheIds = student.salle.getEntity().tranche.getItems().map((trancheStudent) => trancheStudent.id);
      console.log("===========>idssssss"+studentTrancheIds)
      for (const tranche of tranches) {
          console.log("============>traaaaa"+tranche.id)
        const Nom = tranche.name;
        const Priority = tranche.priority;
        const trancheStudent = tranche.trancheStudent.getItems()
        .filter(async a=>(await a.tranche.load()).id===tranche.id);
        console.log('tranchestudent=======>'+trancheStudent)
        if (!studentTrancheIds.includes(tranche.id)) {
          // The student has not started paying this tranche
          const Nom = tranche.name;
          const Priority = tranche.priority;
  
          result.push({
            studentid,
            Nom,
            Priority,
            montantPercu: 0,
            trancheNotPayed
          });
        } 
  
        for(const trancheStd of trancheStudent){
          const restObject = await this.tranchestudentservice.findRestByTrancheAndStudent(studentid, trancheStd.tranche.id);
          const montantPercu = restObject ? restObject.montant || 0 : 0;
        console.log('==========>rest'+montantPercu)
  
        result.push({
          studentid,
          Nom,
          Priority,
          montantPercu,
          trancheNotPayed
        });
      }
    }
    }
    return result.filter(a=>a.studentid===studentid);

    }
}