/* eslint-disable prettier/prettier */
import { EntityManager, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CategoriePersonnel } from 'src/entities/categorie-personnel.entity';
import { CategoriePrime } from 'src/entities/categorie-prime.entity';
import { CategoriePrimeCreateInput } from './dto/categorie-prime.input';
import { CategoriePrimeUpdate } from './dto/categorie-prime.update';

@Injectable()
export class CategoriePrimeService {
  constructor(
    @InjectRepository(CategoriePrime)
    private categoriePrimeRepository: EntityRepository<CategoriePrime>,
    private readonly em: EntityManager,
  ) {}

  async create(
    input: CategoriePrimeCreateInput,
  ): Promise<CategoriePrime> {
    const categoriePrime = new CategoriePrime()
    categoriePrime.nom = input.nom
    categoriePrime.description = input.description
    
    await this.categoriePrimeRepository.persistAndFlush(categoriePrime)
    return categoriePrime
  }

  findByOne(filters: FilterQuery<CategoriePrime>): Promise<CategoriePrime | null> {
    return this.categoriePrimeRepository.findOne(filters);
  }

  findById(id:string){
    return this.categoriePrimeRepository.findOne(id)
  }

  getAll(): Promise<CategoriePrime[]> {
    return this.categoriePrimeRepository.findAll()
  }
  
  async update(id:string, input: CategoriePrimeUpdate): Promise<CategoriePrime> {
    const categorie= await this.findById(id)
    wrap(categorie).assign({
      nom: input.nom || categorie.nom,
      description: input.description || categorie.description
    });

    await this.categoriePrimeRepository.persistAndFlush(categorie);

    return categorie;
  }

  async delete(id: string){
  const a= this.findById(id)
  await this.categoriePrimeRepository.removeAndFlush(a)
  
  if(!a){
    throw Error("not found")
  }
  return a
}

}