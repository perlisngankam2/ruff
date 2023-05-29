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
import { TrancheStat } from '../statistics/classStatistics';
import { PensionSalleService } from '../pensionsalle/pensionsalle.service';


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
        private  em: EntityManager,
      ) {}
    
      async create(
        input: TrancheCreateInput,
      ): Promise<Tranche> {  
        const tranche = new Tranche()

        // const pension = input.pension
        // ? await this.pensionService.findByOne(input.pension_id)
        // : await this.pensionService.create(input.pension) 

        const year = await this.parameterservice.getAll()
        const annee = year[year.length-1].year
        wrap(tranche).assign(
          {
            montant: input.montant,
            name: input.name,
            description: input.description,
            // dateLine:format(input.dateLine, 'dd/MM/yyyy'),
            dateLine:input.dateLine,
            // anneeAccademique: input.anneeAcademiqueId,
            salle: input.salleId,
            year: annee,
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
        const annee = year[year.length-1].year
        wrap(tranche).assign({
            name:input.name || tranche.name,
            montant: input.montant || tranche.montant,
            year: annee,
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
            parameter.year= input;
            this.trancheRepository.persist(parameter);
          });
          
          await this.trancheRepository.flush();
      }
      async delete(id:string){
        const a = this.findById(id) 
        await this.trancheRepository.removeAndFlush(await a)
        if(!a){
        throw Error("not found")
      }
        return a 
      }   

      async findByStudentRestTranche(studentid:string){
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
            const trancheStudent = tranche.trancheStudent.getItems()
            .filter(async a=>(await a.tranche.load()).id===tranche.id);
            console.log('tranchestudent=======>'+trancheStudent)
            if (trancheStudent.length==0) break;
      
            for(const trancheStd of trancheStudent){
            const Rest= (await this.tranchestudentservice.findRestByTrancheAndStudent(trancheStd.student.id, trancheStd.tranche.id)).reste
      
            result.push({
              studentid,
              Nom,
              Priority,
              Rest
            });
          }
        }
        }
        return result.filter(a=>a.studentid===studentid);

      }
}