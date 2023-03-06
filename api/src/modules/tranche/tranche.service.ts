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
import { Tranche } from 'src/entities/tranche.entity';
import { AnneeAccademiqueService } from '../anne_accademique/anne-accademique.service';
import { PensionService } from '../pension/pension.service';
import { SalleService } from '../salle/salle.service';
import { TrancheCreateInput } from './dto/tranche.input';
import { TrancheUpdateInput } from './dto/tranche.update';

@Injectable()
export class TrancheService {
    constructor(
        @InjectRepository(Tranche)
        private trancheRepository: EntityRepository<Tranche>,
        private pensionService: PensionService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: TrancheCreateInput,
      ): Promise<Tranche> {  
        const tranche = new Tranche()

        // const pension = input.pension
        // ? await this.pensionService.findByOne(input.pension_id)
        // : await this.pensionService.create(input.pension)


        wrap(tranche).assign(
          {
            montant: input.montant,
            name: input.name,
            description: input.description,
            dateLine: input.dateLine,
            anneeAccademique: input.anneeAcademiqueId
            // pension: pension.id
          },
          {
            em:this.em
          }
        )
        
        await this.trancheRepository.persistAndFlush(tranche)
        return tranche
      }
    
      findByOne(filters: FilterQuery<Tranche>): Promise<Tranche | null> {
        return this.trancheRepository.findOne(filters);
      }
      findById(id:string){
        return this.trancheRepository.findOne(id)
      }
    
      getAll(): Promise<Tranche[]> {
        return this.trancheRepository.findAll()
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

         
        wrap(tranche).assign({
            name:input.name || tranche.name,
            montant: input.montant || tranche.montant,
            anneeAccademique:input.anneeAcademiqueId,
            description: input.description || tranche.description,
            dateLine: input.dateLine || tranche.dateLine
        },
        { em: this.em },
    );
        await this.trancheRepository.persistAndFlush(tranche);
        return tranche;
      }
      async delete(id:string){
       const a = this.findById(id) 
       await this.trancheRepository.removeAndFlush(a)
       if(!a){
       throw Error("not found")
       }
       return a 
      }   
}