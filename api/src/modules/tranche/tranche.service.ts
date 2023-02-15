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
import { Pension } from 'src/entities/pension.entity';
import { Tranche } from 'src/entities/tranche.entity';
import { AnneeAccademiqueService } from '../anne_accademique/anne-accademique.service';
import { PensionService } from '../pension/pension.service';
import { SalleService } from '../salle/salle.service';
import { TrancheCreateInput } from './dto/tranche.input';
import { TrancheUpdateInput } from './dto/tranche.update';

@Entity()
@ObjectType()
export class TrancheService {
    constructor(
        @InjectRepository(Tranche)
        private trancheRepository: EntityRepository<Tranche>,
        private pensionService: PensionService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: TrancheCreateInput,
      ): Promise<Tranche> {  
        const tranche = new Tranche()

        const pension = input.pension
        ? await this.pensionService.findByOne(input.pension.ID)
        : await this.pensionService.create(input.pension)


        tranche.montant = input.montant
        tranche.name = input.name
        tranche.description = input.description 
        tranche.pension.id = pension.id
        
        await this.trancheRepository.persistAndFlush(tranche)
        return tranche
      }
    
      findByOne(filters: FilterQuery<Tranche>): Promise<Tranche | null> {
        return this.trancheRepository.findOne(filters);
      }
      findById(id:string){
        return this.trancheRepository.findOne(id)
      }
    
      getAll(): Promise<Tranche[]> {
        return this.trancheRepository.findAll()
      }
      
      async update(id:string, input: TrancheUpdateInput): Promise<Tranche> {
        const tranche= await this.findById(id)
        if (input.pension) {
            const pension =
            input.pension?.ID &&
              (await this.pensionService.findByOne({ id: input.pension?.ID }));
      
            if (!pension) {
              throw new NotFoundError('pension no exist' || '');
            }
            this.pensionService.update(pension.id, input.pension);
          }

         
        wrap(tranche).assign({
            name:input.name || tranche.name,
            montant: input.montant || tranche.montant,
            description: input.description || tranche.description,
            dateLine: input.dateLine || tranche.dateLine
        },
        { em: this.em },
    );
        await this.trancheRepository.persistAndFlush(tranche);
        return tranche;
      }
      async delete(id:string){
       const a = this.findById(id) 
       await this.trancheRepository.removeAndFlush(a)
       if(!a){
       throw Error("not found")
       }
       return a 
      }   
}