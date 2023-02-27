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
  import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimePersonnel } from 'src/entities/prime-personnel.entity';
import { Prime } from 'src/entities/prime.entity';
import { CategoriePrimeService } from '../categorie_prime/categorie-prime.service';
import { PersonnelService } from '../personnel/personnel.service';
import { PrimeService } from '../prime/prime.service';
import { PrimePersonnelCreateInput } from './dto/prime-personnel.input';
import { PrimePersonnelUpdateInput } from './dto/prime-personnel.update';

@Entity()
@ObjectType()
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
        const prime = input.prime
            ? await this.primeService.findByOne(input.prime)
            : await this.primeService.create(input.prime)
        
        const personnel = await this.personnelService.findOne(input.personnelId)
        if(!personnel){
            throw new NotFoundError('personnel no exist' || '');
        }
        
        const primePersonnel = new PrimePersonnel()

        wrap(primePersonnel).assign(
          {
           personnel: personnel.id,
           prime: prime.id
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
       const a = (await this.em.find(PrimePersonnel,{personnel: id})).map(a=>a.prime.load()).map(a=>a)
       return a
      }
      
      async update(id:string, input: PrimePersonnelUpdateInput): Promise<PrimePersonnel> {
        const  primePersonnel= await this.findById(id)
        if (input.prime) {
            const prime =
            input.primeId &&
              (await this.primeService.findByOne({ id: input.primeId}));
      
            if (!prime) {
              throw new NotFoundError('prime no exist' || '');
            }
            this.primeService.update(prime.id, input.prime);
          }  
          
          if (input.personnel) {
            const personnel =
            input.personnelId &&
              (await this.personnelService.findOne({ id: input.personnelId }));
      
            if (!personnel) {
              throw new NotFoundError('personnel no exist' || '');
            }
            this.personnelService.update(personnel.id, input.personnel);
          }  
        wrap(primePersonnel).assign({
            prime: input.prime || primePersonnel.prime,
            personnel: input.personnel || primePersonnel.personnel
          },
          { em: this.em },
    );
        await this.primePersonnelRepository.persistAndFlush(primePersonnel);
        return primePersonnel;
      }
    
      async delete(id:string){
       const a = this.findById(id)
       await this.primePersonnelRepository.removeAndFlush(a)
       if(!a){
       throw Error("not found")
       }
       return a
      }
    
}