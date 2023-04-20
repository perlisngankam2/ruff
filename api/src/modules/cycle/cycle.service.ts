/* eslint-disable prettier/prettier */
import {
    Entity,
    EntityManager,
    FilterQuery,
    wrap,
  } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Cycle } from 'src/entities/cycle.entity';
import { SalaireBase } from 'src/entities/salaire-base.entity';
import { Section } from 'src/entities/section.entity';
import { SectionService } from '../section/section.service';
import { CycleCreateInput } from './dto/cycle.input';
import { CycleUpdateInput } from './dto/cycle.update';

@Injectable()
export class CycleService {
    constructor(
        @InjectRepository(Cycle)
        private cycleRepository: EntityRepository<Cycle>,
        private sectionService: SectionService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: CycleCreateInput,
      ): Promise<Cycle> {  
        
        // const section = input.section
        // ? await this.sectionService.findByOne({id:input.sectionId})
        // : await this.sectionService.create(input.section)
       
         await this.sectionService.findByOne({id:input.sectionId})
        
        const cycle = new Cycle()

        wrap(cycle).assign(
          {
          name: input.name,
          section: input.sectionId
          },
          {
            em: this.em
          }
        )

        await this.cycleRepository.persistAndFlush(cycle)
        return cycle
      }
    
      // findByOne(filters: FilterQuery<Section>): Promise<Cycle | null> {
      //   return this.cycleRepository.findOne(filters);
      // }

      findById(id:string){
        return this.cycleRepository.findOne(id)
      }

      findByniveauetude(id:string){
        return this.cycleRepository.findOne({niveauEtude:id})
      }
    
      getAll(): Promise<Cycle[]> {
        return this.cycleRepository.findAll()
      }

      async getAllbyniveau(niveauid:string): Promise<Cycle[]> {
        return await this.cycleRepository.find({niveauEtude:niveauid})
      }
      
      async update(id:string, input: CycleUpdateInput): Promise<Cycle> {
        const cycle = await this.findById(id)
        wrap(cycle).assign({
            name: input.name || cycle.name,
            section: input.sectionId || cycle.section
        },
        { em: this.em },
    );
        await this.cycleRepository.persistAndFlush(cycle);
        return cycle;
      } 

      async delete(id:string):Promise<Cycle>{
      const a= await this.findById(id)
      await this.cycleRepository.removeAndFlush(a)
      if(!a){
        throw Error("not found")
      }
      return a
      }
}