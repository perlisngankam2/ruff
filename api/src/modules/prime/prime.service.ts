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
import { Prime } from 'src/entities/prime.entity';
import { CategoriePrimeService } from '../categorie_prime/categorie-prime.service';
import { PrimeCreateInput } from './dto/prime.input';
import { PrimeUpdateInput } from './dto/prime.update';


@Injectable()
export class PrimeService {
    constructor(
        @InjectRepository(Prime)
        private primeRepository: EntityRepository<Prime>,
        private readonly em: EntityManager,
        private categoriePrime: CategoriePrimeService
      ) {}
    
      async create(
        input: PrimeCreateInput,
      ): Promise<Prime> {
        const categorie = this.categoriePrime.findById(input.categorieId)
        if(!categorie){
          throw Error("not found")
        }
        const new_prime = new Prime()
        wrap(new_prime).assign(
          {
          categoriePrime: input.categorieId,
          nom: input.nom,
          montant: Number(input.montant),
          description: input.description
          },
          {
            em: this.em
          }
        )
        
        await this.primeRepository.persistAndFlush(new_prime)
        return new_prime
      }
    
      findByOne(filters: FilterQuery<Prime>): Promise<Prime | null> {
        return this.primeRepository.findOne(filters);
      }
      findById(id:string){
        return this.primeRepository.findOne(id)
      }
    
      getAll(): Promise<Prime[]> {
        return this.primeRepository.findAll()
      }
      
      async update(id:string,input: PrimeUpdateInput): Promise<Prime> {
        const prime = await this.findById(id)
        // if (input.categoriePirme) {
        //     const categorie =
        //     input.categoriePirme?.ID &&
        //       (await this.categoriePrime.findByOne({ id: input.categoriePirme?.ID }));
      
        //     if (!categorie) {
        //       throw new NotFoundError('categorie no exist' || '');
        //     }
        //     this.categoriePrime.update(categorie.id, input.categoriePirme);
        //   }   
        wrap(prime).assign({
            nom:input.nom || prime.nom,
            description: input.description || prime.description,
            montant:input.montant || prime.montant
        },
        { em: this.em },
    );
        await this.primeRepository.persistAndFlush(prime);
        return prime;
      }

      async getallpersonnelprime(id:string){
        const a = (await this.em.find(Prime,{personnel: id})).map(a=>a.montant).reduce(function(a,b){ return a+b})
        return a
       }
    
      async delete(id:string){
       const a = this.findById(id)
       await this.primeRepository.removeAndFlush(a)
       if(!a){
       throw Error("not found")
       }
       return a
      }
    
}