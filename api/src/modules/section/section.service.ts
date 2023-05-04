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
import { Section } from 'src/entities/section.entity';
import { SectionCreateInput } from './dto/section.input';
import { SectionUpdateInput } from './dto/section.update';

@Injectable()
export class SectionService {
    constructor(
        @InjectRepository(Section)
        private sectionRepository: EntityRepository<Section>,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: SectionCreateInput,
      ): Promise<Section> {        
        const section = new Section()

        section.name= input.name
        section.description = input.description || null
        

        await this.sectionRepository.persistAndFlush(section)
        return section
      }
    
      findByOne(filters: FilterQuery<Section>): Promise<Section | null> {
        return this.sectionRepository.findOne(filters);
      }
      findById(id:string){
        return this.sectionRepository.findOne(id)
      }

      getAllForUse(): Promise<Section[]> {
        return this.sectionRepository.findAll({
          populate: ['cycle', 'cycle.niveauEtude', 'cycle.niveauEtude.salle', 'cycle.niveauEtude.salle.student', 'cycle.niveauEtude.salle.student.pension']
        })
      }


      getAll(): Promise<Section[]> {
        return this.sectionRepository.findAll()
      }
      
      async update(id:string, input: SectionUpdateInput): Promise<Section> {
        const section = await this.findById(id)
        
        wrap(section).assign({
            name: input.name || section.name,
            description: input.description || section.description
        },
        { em: this.em },
    );
        await this.sectionRepository.persistAndFlush(section);
        return section;
      }
      async delete(id:string){
       const a= this.findById(id)
       await this.sectionRepository.removeAndFlush(await a)
       if(!a){
      throw Error("not found")
       }
       return a
      }   
}