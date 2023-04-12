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
import { AnneeAccademiqueService } from '../anne_accademique/anne-accademique.service';
import { NiveauEtudeService } from '../niveau_etude/niveau-etude.service';
import { SalleService } from '../salle/salle.service';
import { PensionCreateInput } from './dto/pension.input';
import { PensionUpdateInput } from './dto/pension.update';
import { format } from 'date-fns';
import { StudentService } from '../student/student.service';
import { TrancheStudentService } from '../tranche-student/tranche-student.service';

@Injectable()
export class PensionService {
    constructor(
        @InjectRepository(Pension)
        private pensionRepository: EntityRepository<Pension>,
        @Inject(forwardRef(() => StudentService))
        private studentservice: StudentService,
        private trancheStudentservice: TrancheStudentService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: PensionCreateInput,
      ): Promise<Pension> {  

        const pension = new Pension()

        const student = await this.studentservice.findByOne(input.studentId)
        if(!student){
          throw Error('!!!!!!!!!!!!!!!!!STUDENT DOES NOT EXISTS!!!!!!!!!!!!!!!!!!')
        }
        const montant = (await this.trancheStudentservice.findByStudent(student.id)).map(a=>a.montant).reduce(function(a,b){return a+b})

        wrap(pension).assign(
          {
            montantPension:montant,
            name: input.name,
            description: input.description,
            // anneeAccademique: input.anneeAcademiqueId,
            dateLine: format(input.dateLine, 'dd/MM/yyyy'),
            student: student.id
            
          },
          {
            em:this.em
          }
        )
        
        await this.pensionRepository.persistAndFlush(pension)
        return pension
      }
    
      findByOne(filters: FilterQuery<Pension>): Promise<Pension | null> {
        return this.pensionRepository.findOne(filters);
        }
      findById(id:string){
        return this.pensionRepository.findOne(id)
        }
    
      getAll(): Promise<Pension[]> {
        return this.pensionRepository.findAll()
      }
      
      async update(id:string, input: PensionUpdateInput): Promise<Pension> {
        const pension = await this.findById(id)
        const student = await this.studentservice.findByOne(input.studentId)
        if(!student){
          throw Error('!!!!!!!!!!!!!!!!!STUDENT DOES NOT EXISTS!!!!!!!!!!!!!!!!!!')
        }
        const montant = (await this.trancheStudentservice.findByStudent(student.id)).map(a=>a.montant).reduce(function(a,b){return a+b})

        wrap(pension).assign({
            name:input.name || pension.name,
            dateLine: format(input.dateLine, 'dd/MM/yyyy'),
            description: input.description || pension.description,
            montantPension:montant,
            student:input.studentId||pension.student
        },
        { em: this.em },
    );
        await this.pensionRepository.persistAndFlush(pension);
        return pension;
      }
      async delete(id:string){
        const a = this.findById(id)
        await this.pensionRepository.removeAndFlush(a)
        if(!a){
        throw Error("not found")
        }
        return a
      }   
}