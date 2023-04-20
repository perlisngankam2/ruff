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
import { PrimePersonnel } from 'src/entities/prime-personnel.entity';
import { Prime } from 'src/entities/prime.entity';
import { CategoriePrimeService } from '../categorie_prime/categorie-prime.service';
import { PersonnelService } from '../personnel/personnel.service';
import { PrimeService } from '../prime/prime.service';
import { PrimePersonnelCreateInput } from './dto/prime-personnel.input';
import { PrimePersonnelUpdateInput } from './dto/prime-personnel.update';

@Injectable()
export class PrimePersonnelService {
    constructor(
        @InjectRepository(PrimePersonnel)
        private primePersonnelRepository: EntityRepository<PrimePersonnel>,
        private readonly em: EntityManager,
        private personnelService: PersonnelService,
        private primeService: PrimeService
      ) {}
    
      async create(
        input: PrimePersonnelCreateInput,
      ): Promise<PrimePersonnel> {
        // const prime = input.prime
        //     ? await this.primeService.findByOne(input.primeId)
        //     : await this.primeService.create(input.prime)
        
               const prime = await this.primeService.findByOne(input.primeId)
        const personnel = await this.personnelService.findById(input.personnelId)
        if(!(personnel&&prime)){
            throw Error("not found");
        }
        
        const primePersonnel = new PrimePersonnel()

        wrap(primePersonnel).assign(
          {
           personnel:input.personnelId,
           prime: input.primeId,
           startMonth: input.startMonth,
          //  endDate: input.enddate
          },
          {
            em: this.em
          }
        )

        await this.primePersonnelRepository.persistAndFlush(primePersonnel)
        return primePersonnel
      }

      async update(
        id:string,input: PrimePersonnelUpdateInput,
      ): Promise<PrimePersonnel> {
        // const prime = input.prime
        //     ? await this.primeService.findByOne(input.primeId)
        //     : await this.primeService.create(input.prime)
        
        const prime = await this.primeService.findByOne(input.primeId)
        const personnel = await this.personnelService.findById(input.personnelId)
        if(!(personnel&&prime)){
            throw Error("not found");
        }
        
        const primePersonnel = this.findByOne(id)

        wrap(primePersonnel).assign(
          {
           personnel:input.personnelId,
           prime: input.primeId,
           startMonth: input.startMonth,
          //  endDate: input.enddate
          },
          {
            em: this.em
          }
        )

        await this.primePersonnelRepository.persistAndFlush(primePersonnel)
        return primePersonnel
      }
    
      findByOne(filters: FilterQuery<PrimePersonnel>): Promise<PrimePersonnel | null> {
        return this.primePersonnelRepository.findOne(filters);
      }
      findById(id:string){
        return this.primePersonnelRepository.findOne(id)
      }
    
      getAll(): Promise<PrimePersonnel[]> {
        return this.primePersonnelRepository.findAll()
      }

     async getallpersonnelprime(id:string){
      const where = {};
      if (id) {
        where['personnel'] = id;
      }
  
      const a = await this.em.find(PrimePersonnel, where, {
        populate: true,
        orderBy: { id: 'ASC' },
      });
  
      console.log('============>list of primes personnel::'+a)
     
      if(a.length==0){
        return 0
      }
      if(a.length!=0){
      console.log('==============>montant prime::'+await a.map(async a=>(await a.prime.load()).montant).reduce(async function(a,b){return await a+ await b}))
      const b = a.map(async a=>(await a.prime.load()).montant)
      console.log(b)
      const c=await b.reduce(async function(a,b){return await a+ await b})
      console.log(c)
      return c 
      }
      }
      
    //   async update(id:string, input: PrimePersonnelUpdateInput): Promise<PrimePersonnel> {
    //     const  primePersonnel= await this.findById(id)
    //     if (input.prime) {
    //         const prime =
    //         input.primeId &&
    //           (await this.primeService.findByOne({ id: input.primeId}));
      
    //         if (!prime) {
    //           throw new NotFoundError('prime no exist' || '');
    //         }
    //         this.primeService.update(prime.id, input.prime);
    //       }  
          
    //       if (input.personnel) {
    //         const personnel =
    //         input.personnelId &&
    //           (await this.personnelService.findOne({ id: input.personnelId }));
      
    //         if (!personnel) {
    //           throw new NotFoundError('personnel no exist' || '');
    //         }
    //         this.personnelService.update(personnel.id, input.personnel);
    //       }  
    //     wrap(primePersonnel).assign({
    //         prime: input.prime || primePersonnel.prime,
    //         personnel: input.personnel || primePersonnel.personnel
    //       },
    //       { em: this.em },
    // );
    //     await this.primePersonnelRepository.persistAndFlush(primePersonnel);
    //     return primePersonnel;
    //   }
    
      async delete(id:string){
       const a = this.findById(id) 
       await this.primePersonnelRepository.removeAndFlush(a)
       if(!a){
       throw Error("not found")
       }
       return a
      }

async findnamesprimesbypersonnel(personnelid:string){
  return (await this.primePersonnelRepository.find({personnel:personnelid})).map(async a=>(await a.prime.load()).nom)
}

async findmontantprimesbypersonnel(personnelid:string){
  return (await this.primePersonnelRepository.find({personnel:personnelid})).map(async a=>(await a.prime.load()).montant)
} 
    
}