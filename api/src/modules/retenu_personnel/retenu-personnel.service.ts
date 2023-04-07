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
import { RetenuPersonnel } from '../../entities/retenu-personnel.entity';
import { PersonnelService } from '../personnel/personnel.service';
import { RetenuService } from '../retenu_salarial/retenu.service';
import { RetenuPersonnelCreateInput } from './dto/retenu-personnel.input';
import { RetenuPersonnelUpdateInput } from './dto/retenu-personnel.update';

@Injectable()
export class RetenuPersonnelService {
    constructor(
        @InjectRepository(RetenuPersonnel)
        private retenuPersonnelRepository: EntityRepository<RetenuPersonnel>,
        private readonly em: EntityManager,
        private personnelService: PersonnelService,
        private retenuService: RetenuService
      ) {}
    
      async create(
        input: RetenuPersonnelCreateInput,
      ): Promise<RetenuPersonnel> {
        const retenu = this.retenuService.findByOne(input.retenuId)
        
        const personnel = this.personnelService.findOne(input.personnelId)

        if(!(retenu&&personnel)){
          throw Error("retenu and personnel not found")
        }

        const retenuPersonnel = new RetenuPersonnel()

        wrap(retenuPersonnel).assign(
          {
          personnel: input.personnelId,
          retenue: input.retenuId
          },
          {
            em: this.em
          }
        )
        

        await this.retenuPersonnelRepository.persistAndFlush(retenuPersonnel)
        return retenuPersonnel
      }
    
      findByOne(filters: FilterQuery<RetenuPersonnel>): Promise<RetenuPersonnel | null> {
        return this.retenuPersonnelRepository.findOne(filters);
      }

      findById(id:string){
        return this.retenuPersonnelRepository.findOne(id)
      }
    
      getAll(): Promise<RetenuPersonnel[]> {
        return this.retenuPersonnelRepository.findAll()
      }
      
      async update(id:string, input: RetenuPersonnelUpdateInput): Promise<RetenuPersonnel> {
        const retenuPersonnel = await this.findById(id)
        // if (input.retenuId) {
        //     const retenu =
        //     input.retenuId &&
        //       (await this.retenuService.findByOne({ id: input.retenuId }));
      
        //     if (!retenu) {
        //       throw new NotFoundError('prime no exist' || '');
        //     }
        //     this.retenuService.update(retenu.id, input.retenuId);
         
          
          
        // if (input.personnnel) {
        //     const personnel =
        //     input.personnelId &&
        //       (await this.personnelService.findOne({ id: input.personnelId}));
      
        //     if (!personnel) {
        //       throw new NotFoundError('personnel no exist' || '');
        //     }
        //     this.personnelService.update(personnel.id, input.personnnel);
        //   }  
        wrap(retenuPersonnel).assign(
          {
            retenue: input.retenuId || retenuPersonnel.retenue,
            personnel: input.personnelId || retenuPersonnel.personnel
          },
        { 
          em: this.em 
        });
        await this.retenuPersonnelRepository.persistAndFlush(retenuPersonnel);
        return retenuPersonnel;
      }

      async getallretenupersonnelbypersonnel(id:string){
       return this.retenuPersonnelRepository.find({personnel:id})
      } 
    
 async getallretenupersonnel(id:string){
        const where = {};
      if (id) {
        where['personnel'] = id;
      }
  
      const a = await this.em.find(RetenuPersonnel, where, {
        populate: true,
        orderBy: { id: 'ASC' },
      });
  
      console.log('============>list of retenu personnel::'+a)
     
      if(a.length==0){
        return 0
      }
      if(a.length!=0){
      console.log('==============>montant retenu::'+await a.map(async a=>(await a.retenue.load()).montant).reduce(async function(a,b){return await a+ await b}))
      return await a.map(async a=>(await a.retenue.load()).montant).reduce(async function(a,b){return await a+ await b})
      }
    }

      async delete(id:string){
      const a = this.findById(id)
      await this.retenuPersonnelRepository.removeAndFlush(a)
      if(!a){
      throw Error("not found")
      }
      return a
    
}

async findbypersonnel(personnelid:string){
  return await this.retenuPersonnelRepository.find({personnel:personnelid})
}

}