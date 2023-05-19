/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    EntityManager,
    FilterQuery,
    wrap,
  } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SalaireBase } from 'src/entities/salaire-base.entity';
import { SalaireBaseCreateInput } from './dto/salaire-base.input';
import { SalaireBaseUpdateInput } from './dto/salaire-base.update';

@Injectable()
export class SalaireBaseService {
    constructor(
        @InjectRepository(SalaireBase)
        private salaireBaseRepository: EntityRepository<SalaireBase>,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: SalaireBaseCreateInput,
      ): Promise<SalaireBase> {        
        const salaireBase = new SalaireBase()

        wrap(salaireBase).assign(
          {
           montant: input.montant,
           description: input.description
          },
          {
            em:this.em
          }
        )
        

        await this.salaireBaseRepository.persistAndFlush(salaireBase)
        return salaireBase
      }
    
      findByOne(filters: FilterQuery<SalaireBase>): Promise<SalaireBase | null> {
        return this.salaireBaseRepository.findOne(filters);
      }
      findById(id:string){
        return this.salaireBaseRepository.findOne(id)
      }
    
      getAll(): Promise<SalaireBase[]> {
        return this.salaireBaseRepository.findAll()
        
      }
      
      async update(id:string, input: SalaireBaseUpdateInput): Promise<SalaireBase> {
        const salaireBase = await this.findById(id)
        
        wrap(salaireBase).assign({
            montant: input.montant || salaireBase.montant,
            description: input.description || salaireBase.description
        },
        { em: this.em },
    );
        await this.salaireBaseRepository.persistAndFlush(salaireBase);
        return salaireBase;
      }
      async delete(id:string){
        const a = this.findById(id) 
        await this.salaireBaseRepository.removeAndFlush(a)
        if(!a){
        throw Error("not found")
        }
        return a
      }   
}