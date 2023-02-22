/* eslint-disable prettier/prettier */
import { EntityManager, FilterQuery, NotFoundError, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import * as bcript from 'bcrypt';
import { CategoriePersonnel } from 'src/entities/categorie-personnel.entity';
import { CategoriePersonnelCreateInput } from './dto/categorie-personnel.input';
import { CategoriePersonnelUpdate } from './dto/categorie-personnel.update';
import { SalaireBaseService } from '../salaire_base/salaire-base.service';
import { RetenuService } from '../retenu_salarial/retenu.service';
import { PrimeService } from '../prime/prime.service';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class CategoriePersonnelService {
  constructor(
    @InjectRepository(CategoriePersonnel)
    private categoriePersonelRepository: EntityRepository<CategoriePersonnel>,
    private salaireBaseeService: SalaireBaseService,
    private retenu : RetenuService,
    private prime: PrimeService,
    private readonly em: EntityManager,
  ) {}

  async create(
    input: CategoriePersonnelCreateInput,
  ): Promise<CategoriePersonnel> {

    // const prime = input.prime
    // ? await this.prime.findByOne(input.prime)
    // : await this.prime.create(input.prime)

    // const retenu = input.retenu
    // ? await this.retenu.findByOne(input.retenu)
    // : await this.retenu.create(input.retenu)


    // const salaire = input.salaireBase
    // ? await this.salaireBaseeService.findByOne(input.salaireBase)
    // : await this.salaireBaseeService.create(input.salaireBase)
        
    const categoriePersonnel = new CategoriePersonnel()
    categoriePersonnel.nom = input.nom
    categoriePersonnel.description = input.description
    // categoriePersonnel.salaireBase.id = salaire.id
    // categoriePersonnel.retenu.id = retenu.id
    // categoriePersonnel.prime.id = prime.id

    await this.categoriePersonelRepository.persistAndFlush(categoriePersonnel)
    return categoriePersonnel
  }

  findByOne(filters: FilterQuery<CategoriePersonnel>): Promise<CategoriePersonnel | null> {
    return this.categoriePersonelRepository.findOne(filters);
  }

  findById(id:string){
    return this.categoriePersonelRepository.findOne(id)
  }

  getAll(): Promise<CategoriePersonnel[]> {
    return this.categoriePersonelRepository.findAll()
  }
  
  async update(id:string, input: CategoriePersonnelUpdate): Promise<CategoriePersonnel> {
    const categorie = await this.findById(id)
    if (input.prime) {
      const prime =
      input.prime?.ID &&
        (await this.prime.findByOne({ id: input.prime?.ID }));

      if (!prime) {
        throw new NotFoundError('prime no exist' || '');
      }
      this.prime.update(prime.id, input.prime);
    } 
    
    if (input.retenu) {
      const retenu =
      input.retenu?.ID &&
        (await this.retenu.findByOne({ id: input.retenu?.ID }));

      if (!retenu) {
        throw new NotFoundError('retenu no exist' || '');
      }
      this.retenu.update(retenu.id, input.retenu);
    } 

    if (input.salaireBase) {
      const salaire =
      input.salaireBase?.ID &&
        (await this.salaireBaseeService.findByOne({ id: input.salaireBase?.ID }));

      if (!salaire) {
        throw new NotFoundError('salaire no exist' || '');
      }
      this.salaireBaseeService.update(salaire.id, input.salaireBase);
    } 

    wrap(categorie).assign({
      nom: input.nom || categorie.nom,
      description: input.description || categorie.description
    });

    await this.categoriePersonelRepository.persistAndFlush(categorie);

    return categorie;
  }

  async delete(id : string){
    const a = this.findById(id)
    await this.categoriePersonelRepository.nativeDelete(await a)
      if(!a){
          throw Error("not found")
        }
        return a
  }

}