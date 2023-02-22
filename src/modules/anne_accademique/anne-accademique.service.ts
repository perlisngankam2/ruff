/* eslint-disable prettier/prettier */
import { EntityManager, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { EntityRepository} from '@mikro-orm/postgresql';
import { AnneeAccademique } from 'src/entities/annee-accademique.entity';
import { AnneeAccademiqueCreateInput } from './dto/anne-accademique.update';
import { AnneeAccademiqueUpdateInput } from './dto/anne-accadmique.input';


@Injectable()
export class AnneeAccademiqueService {
  constructor(
    @InjectRepository(AnneeAccademique)
    private readonly anneAccademiquePrimeRepository : EntityRepository<AnneeAccademique>,
    private readonly em: EntityManager,
  ) {}


   async findbyOne(filters: FilterQuery<AnneeAccademique>): Promise<AnneeAccademique | null> {
     return await this.anneAccademiquePrimeRepository.findOne(filters);
    }

  async findById(id:string){
    return await this.anneAccademiquePrimeRepository.findOne(id)
  }

  async create(
    input:AnneeAccademiqueCreateInput,
  ): Promise<AnneeAccademique> {

    const annee = new AnneeAccademique()  
    wrap(annee).assign(
      {
        name: input.name,
        anneeAccademique:new Date(input.anneeAccademique),
        description: input.description
      },
      {
        em: this.em,
      },
    );

    await this.anneAccademiquePrimeRepository.persistAndFlush(annee)
    return annee
  }


  getAll(): Promise<AnneeAccademique[]> {
    return this.anneAccademiquePrimeRepository.findAll()
  }
  
  async update(id:string, input: AnneeAccademiqueUpdateInput): Promise<AnneeAccademique> {
    const annee = await this.findById(id)
    wrap(annee).assign({
      name: input.name || annee.name,
      description: input.description || annee.description,
      anneeAccademique: input.anneeAccademique || annee.anneeAccademique
    },
    {
      em: this.em,
    },
    );

    await this.anneAccademiquePrimeRepository.persistAndFlush(annee);

    return annee;
  }

  async delete(localid:string): Promise<AnneeAccademique>{
   const a = this.findById(localid)
   await this.anneAccademiquePrimeRepository.removeAndFlush(a);
   if(!a){
    throw console.error("not found");
   }
   return a
  }

}