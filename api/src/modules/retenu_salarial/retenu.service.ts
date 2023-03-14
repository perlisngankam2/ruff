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
import { Retenue } from 'src/entities/retenu-salaire.entity';
import { CategoriePrimeService } from '../categorie_prime/categorie-prime.service';
import { CategorieRetenuService } from '../categorie_retenu/categorie-retenu.service';
import { RetenuCreateInput } from './dto/retenu.input';
import { RetenuUpdateInput } from './dto/retenu.update';


@Injectable()
export class RetenuService {
    constructor(
        @InjectRepository(Retenue)
        private retenuRepository: EntityRepository<Retenue>,
        private readonly em: EntityManager,
        private categorieRetenu: CategorieRetenuService
      ) {}
    
      async create(
        input: RetenuCreateInput,
      ): Promise<Retenue> {
        // const categorie = input.categorieRetenu
        //     ? await this.categorieRetenu.findByOne(input.categorieretenuId)
        //     : await this.categorieRetenu.create(input.categorieRetenu)
        
        const retenu = new Retenue()

        wrap(retenu).assign({
          // categorieRetenu: categorie.id,
          nom: input.nom,
          description: input.description,
          montant: input.montant
        },
        {
          em: this.em
        })
        await this.retenuRepository.persistAndFlush(retenu)
        return retenu
      }
    
      findByOne(filters: FilterQuery<Retenue>): Promise<Retenue | null> {
        return this.retenuRepository.findOne(filters);
      }
      findById(id:string){
        return this.retenuRepository.findOne(id)
      }
    
      getAll(): Promise<Retenue[]> {
        return this.retenuRepository.findAll()
      }
      
      async update(id:string, input: RetenuUpdateInput): Promise<Retenue> {
        const  retenu = await this.findById(id)

        if (input.categorieRetenu) {
            const categorie =
            input.categorieretenuId &&
              (await this.categorieRetenu.findByOne({ id: input.categorieretenuId}));
      
            if (!categorie) {
              throw new NotFoundError('categorie no exist' || '');
            }
            this.categorieRetenu.update(categorie.id, input.categorieRetenu);
          }   
        wrap(retenu).assign({
            nom:input.nom || retenu.nom,
            description: input.description || retenu.description,
            montant:input.montant || retenu.montant
        },
        { em: this.em },
    );
        await this.retenuRepository.persistAndFlush(retenu);
        return retenu;
      }
    
      async delete(id:string){
      const a = this.findById(id)
      await this.retenuRepository.removeAndFlush(a)
      if(!a){
       throw Error("not found")
      }
      return a
      }
    
}