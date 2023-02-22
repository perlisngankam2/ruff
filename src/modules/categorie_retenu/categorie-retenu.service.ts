/* eslint-disable prettier/prettier */
import { EntityManager, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CategoriePersonnel } from 'src/entities/categorie-personnel.entity';
import { CategoriePrime } from 'src/entities/categorie-prime.entity';
import { CategorieRetenu } from 'src/entities/categorie-retenu.entity';
import { CategorieRetenuCreateInput } from './dto/categorie-retenu.input';
import { CategorieRetenuUpdateInput } from './dto/catetegorie-retenu.update';

@Injectable()
export class CategorieRetenuService {
  constructor(
    @InjectRepository(CategorieRetenu)
    private categorieRetenuRepository: EntityRepository<CategorieRetenu>,
    private readonly em: EntityManager,
  ) {}

  async create(
    input: CategorieRetenuCreateInput,
  ): Promise<CategorieRetenu> {
    const categoriePrime = new CategorieRetenu()
    categoriePrime.nom = input.nom
    categoriePrime.description = input.description
    categoriePrime.type = input.type
    
    await this.categorieRetenuRepository.persistAndFlush(categoriePrime)
    return categoriePrime
  }

  findByOne(filters: FilterQuery<CategorieRetenu>): Promise<CategorieRetenu | null> {
    return this.categorieRetenuRepository.findOne(filters);
  }

  findById(id:string){
    return this.categorieRetenuRepository.findOne(id)
  }

  getAll(): Promise<CategorieRetenu[]> {
    return this.categorieRetenuRepository.findAll()
  }
  
  async update(id:string, input: CategorieRetenuUpdateInput): Promise<CategorieRetenu> {
    const categorie= await this.findById(id)
    wrap(categorie).assign({
      nom: input.nom || categorie.nom,
      description: input.description || categorie.description
    });

    await this.categorieRetenuRepository.persistAndFlush(categorie);

    return categorie;
  }

  async delete(id:string){
 const a= this.findById(id)
 await this.categorieRetenuRepository.removeAndFlush(a)
 if(!a){
  throw Error("not found")
 }
 return a
  }

}