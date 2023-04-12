/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    EntityManager,
    Enum,
    Filter,
    FilterQuery,
    IdentifiedReference,
    ManyToOne,
    NotFoundError,
    wrap,
  } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TranchePriorityUpdateInput } from './dto/tranche-priority.update';
import { TranchePriorityInput } from './dto/tranche-priority.input';
import { TranchePriority } from 'src/entities/tranche-priority.entity';

@Injectable()
export class TranchePriorityService {
    constructor(
        @InjectRepository(TranchePriority)
        private tranchePriorityRepository: EntityRepository<TranchePriority>,
        private  em: EntityManager,
      ) {}
    
    //HERE WE ONLY INITIALIZE OUR ADMISSION 
    async create(
        input: TranchePriorityInput
      ): Promise<TranchePriority> {  
        const tranchePriority = new TranchePriority()
        wrap(tranchePriority).assign(
          {
          name : input.name,
        
         
          },
          {
            em: this.em
          }
        )
        await this.tranchePriorityRepository.persistAndFlush(tranchePriority)
        return tranchePriority;
      } 

      findByOne(filters: FilterQuery<TranchePriority>): Promise<TranchePriority | null> {
        return this.tranchePriorityRepository.findOne(filters);
      }
      findById(id:string){
        return this.tranchePriorityRepository.findOne(id)
      }
    
      getAll(): Promise<TranchePriority[]> {
        return this.tranchePriorityRepository.findAll()
      }
      
    async findOrFailled(id:string):Promise<TranchePriority>{
        const tranchePriority = await this.tranchePriorityRepository.findOneOrFail(id)
        return tranchePriority
    }
    

   
  
    async deleteTranchePriority(id:string){
      const a= this.findById(id)
      await this.tranchePriorityRepository.removeAndFlush(a)  
      if(!a){
      throw Error("not found")
      }
      return a
    } 
   
}