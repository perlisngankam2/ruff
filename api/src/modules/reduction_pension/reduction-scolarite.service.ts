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
import { ReductionScolarite } from 'src/entities/reduction-scolarite.entity';
import { RedutionScolariteInput } from './dto/reduction-scolarite.input';
import { UpdateReductionScolariteInput } from './dto/reduction-scolarite.update';


@Entity()
@ObjectType()
export class ReductionScolariteService {
    constructor(
        @InjectRepository(ReductionScolarite)
        private reductionRepository: EntityRepository<ReductionScolarite>,
        private readonly em: EntityManager,
      ) {}
    
      async create(
        input: RedutionScolariteInput,
      ): Promise<ReductionScolarite> {
       
        const reduction = new ReductionScolarite()

        wrap(reduction).assign(
          {
           name: input.name,
           description: input.description,
           montant:Number(input.montant),
           pourcentage: Number(input.pourcentage)
          },
          {
            em: this.em
          }
        )
        await this.reductionRepository.persistAndFlush(reduction)
        return reduction
      }
    
      findByOne(filters: FilterQuery<ReductionScolarite>): Promise<ReductionScolarite | null> {
        return this.reductionRepository.findOne(filters);
      }
      findById(id:string){
        return this.reductionRepository.findOne(id)
      }
    
      getAll(): Promise<ReductionScolarite[]> {
        return this.reductionRepository.findAll()
      }
      
      async update(id:string, input: UpdateReductionScolariteInput): Promise<ReductionScolarite> {
        const reduction = await this.findById(id)
        
        wrap(reduction).assign({
            name:input.name || reduction.name,
            description: input.description || reduction.description,
            montant:Number(input.montant || reduction.montant) || 0.0,
            pourcentage:Number(input.pourcentage || reduction.pourcentage) || 0.0
        },
        { em: this.em },
        );
        await this.reductionRepository.persistAndFlush(reduction);
        return reduction;
      }
      async delete(id:string){
        const a = this.findById(id)
        await this.reductionRepository.removeAndFlush(a)
        if(!a){
        throw Error("not found")
        }
        return a
      }
    
}