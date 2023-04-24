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
import { Injectable } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Pension } from 'src/entities/pension.entity';
import { AnneeAccademiqueService } from '../anne_accademique/anne-accademique.service';
import { NiveauEtudeService } from '../niveau_etude/niveau-etude.service';
import { SalleService } from '../salle/salle.service';
import { PensionSalle } from 'src/entities/pensionsalle.entity';
import { PensionSalleCreateInput } from './dto/pensionsalle.input';
import { PensionSalleUpdateInput } from './dto/pensionsalle.update';

@Injectable()
export class PensionSalleService {
    constructor(
        @InjectRepository(PensionSalle)
        private pensionsalleRepository: EntityRepository<PensionSalle>,
        private salleService: SalleService,
        private anneAccademique: AnneeAccademiqueService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: PensionSalleCreateInput,
      ): Promise<PensionSalle> {  

        const pensionsalle = new PensionSalle()

        await this.anneAccademique.findByOne({id:input.anneeAcademiqueId})
            
            // : await this.anneAccademique.create(input.anneeAccademique)

        await this.salleService.findByOne({id:input.salleId})
             
            // : await this.salleService.create(input.salle)

        wrap(pensionsalle).assign(
          {
            montantPension:input.montantPension,
            name: input.name,
            description: input.description,
            salle: input.salleId,
            anneeAccademique: input.anneeAcademiqueId
          },
          {
            em:this.em
          }
        )
        
        await this.pensionsalleRepository.persistAndFlush(pensionsalle)
        return pensionsalle
      }
    
      findByOne(filters: FilterQuery<PensionSalle>): Promise<PensionSalle | null> {
        return this.pensionsalleRepository.findOne(filters);
        }
      findById(id:string){
        return this.pensionsalleRepository.findOne(id)
        }
    
      getAll(): Promise<PensionSalle[]> {
        return this.pensionsalleRepository.findAll()
      }
      
      async update(id:string, input: PensionSalleUpdateInput): Promise<PensionSalle> {
        const pensionsalle = this.findByOne(id)
        
        wrap(pensionsalle).assign(
          {
            montantPension:input.montantPension,
            name: input.name,
            description: input.description,
            salle: input.salleId,
            anneeAccademique: input.anneeAcademiqueId
          },
          {
            em:this.em
          }
        )
        
        await this.pensionsalleRepository.persistAndFlush(pensionsalle)
        return pensionsalle


      }

      async delete(id:string){
        const a = this.findById(id)
        await this.pensionsalleRepository.removeAndFlush(a)
        if(!a){
        throw Error("not found")
        }
        return a
      }   
}