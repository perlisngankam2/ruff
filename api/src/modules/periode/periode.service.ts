/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    EntityManager,
    FilterQuery,
    wrap,
  } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
  import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Periode } from 'src/entities/periode.entity';
import { Prime } from 'src/entities/prime.entity';
import { CategoriePrimeService } from '../categorie_prime/categorie-prime.service';
import { PeriodeCreateInput } from './dto/periode.input';
import { PeriodeUpdateInput } from './dto/periode.update';


@Entity()
@ObjectType()
export class PeriodeService {
    constructor(
        @InjectRepository(Periode)
        private periodeRepository: EntityRepository<Periode>,
        private readonly em: EntityManager,
      ) {}
    
      async create(
        input: PeriodeCreateInput,
      ): Promise<Periode> {
       const periode = new Periode()

        periode.nom = input.nom
        input.description = input.description
        input.datePeriode = input.datePeriode
        
        await this.periodeRepository.persistAndFlush(periode)
        return periode
      }
    
      findByOne(filters: FilterQuery<Periode>): Promise<Periode | null> {
        return this.periodeRepository.findOne(filters);
      }
      findById(id:string){
        return this.periodeRepository.findOne(id)
      }
    
      getAll(): Promise<Periode[]> {
        return this.periodeRepository.findAll()
      }
      
      async update(id:string, input: PeriodeUpdateInput): Promise<Periode> {
       const periode = await this.findById(id)
        wrap(periode).assign({
            nom:input.nom || periode.nom,
            description: input.description || periode.description,
            datePeriode:input.datePeriode || periode.datePeriode
        },
        { em: this.em },
    );
        await this.periodeRepository.persistAndFlush(periode);
        return periode;
      }
    
      async delete(id:string){
        const a = this.findById(id)
        await this.periodeRepository.removeAndFlush(a)
        if(!a){
        throw Error("not found")
        }
        return a
      }
    
}