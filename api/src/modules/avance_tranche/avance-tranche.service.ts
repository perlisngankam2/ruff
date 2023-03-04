/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    EntityManager,
    FilterQuery,
    NotFoundError,
    wrap
  } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {ObjectType } from '@nestjs/graphql';
import { AvanceTranche } from '../../entities/avance-tranche.entity';
import { TrancheStudentService } from '../tranche-student/tranche-student.service';
import { AvanceTrancheCreateInput } from './dto/avance-tranche.input';
import { AvanceTrancheUpdateInput } from './dto/avance-tranche.update';



@Injectable()
export class AvanceTrancheService {
    constructor(
        @InjectRepository(AvanceTranche)
        private avanceTrancheRepository: EntityRepository<AvanceTranche>,
        @Inject(forwardRef(() => TrancheStudentService))
        private trancheStudent: TrancheStudentService,
        private  em: EntityManager,
      ) {}
    
    async createavancetranche(
        input: AvanceTrancheCreateInput,
      ): Promise<AvanceTranche> {  
        const avanceTranche = new AvanceTranche()

        const tranche = input.tranche
            ? await this.trancheStudent.findByOne({id:input.tranche_id})
            : await this.trancheStudent.create(input.tranche)

        // check s'il y'a pas autre avance 
        // const avance = tranche.avancheTranche
        // if(avance.length != 0){
        //   const reste = avance.matching({orderBy:{'createdAt':{}}})[0].reste
        //   if(reste != 0){
        //          this.trancheStudent.saveTranche(tranche.id)
        //   }
        // }
        // check categorie student
        const fraistranche = (await tranche.tranche.load())
        const student = tranche.student.load()
        const reduction = (await (await student).categorie.load()).reductionScolarite.load()
        
   

        wrap(avanceTranche).assign({
          montant: Number(input.montant),
          name: input.name,
          description: input.description,
          trancheStudent: tranche.id
        },
        {
          em:this.em
        })

        // if((await reduction).pourcentage != 0){
        //   const newValue = (await tranche.tranche.load()).montant - (await tranche.tranche.load()).montant*(await reduction).pourcentage
        //   avanceTranche.reste = newValue - tranche.montant
        //   if(avanceTranche.reste == 0){
        //       avanceTranche.complete = true
        //   }
        // }

        // if((await reduction).montant != 0){
        //   const newValue = (await tranche.tranche.load()).montant - (await reduction).montant
        //   avanceTranche.reste = newValue - tranche.montant
        //   if(avanceTranche.reste == 0){
        //     avanceTranche.complete = true
        //   }
        // }

        if((await reduction).pourcentage != 0){
          const newValue = (await tranche.tranche.load()).montant - (await tranche.tranche.load()).montant*(await reduction).pourcentage
           if(input.montant < newValue){
               // create the avance tranche
              wrap(avanceTranche).assign({
              montant: Number(input.montant),
              name: input.name,
              description: input.description,
              trancheStudent: tranche.id,
              complete: false
              },
              {
                em:this.em
              })
              this.trancheStudent.saveTranche(tranche.id)
              this.avanceTrancheRepository.persistAndFlush(avanceTranche)
              return avanceTranche
              // console.log('===========>'+inscript)   
           }
           tranche.complete = true
           avanceTranche.complete=true
           this.trancheStudent.saveTranche(tranche.id)
           this.avanceTrancheRepository.persistAndFlush(avanceTranche)
           return avanceTranche
        }

        if((await reduction).montant!= 0){
          const newValue = (await tranche.tranche.load()).montant - (await tranche.tranche.load()).montant*(await reduction).pourcentage
           if(input.montant < newValue){
               // create the avance tranche
              wrap(avanceTranche).assign({
              montant: Number(input.montant),
              name: input.name,
              description: input.description,
              trancheStudent: tranche.id,
              complete: false
              },
              {
                em:this.em
              })
              this.trancheStudent.saveTranche(tranche.id)
              this.avanceTrancheRepository.persistAndFlush(avanceTranche)
              return avanceTranche
              // console.log('===========>'+inscript)   
           }

           if(input.montant < fraistranche.montant){
            // create avance inscription
            wrap(avanceTranche).assign({
             montant: Number(input.montant)||0.0,
             name: input.name,
             description: input.description,
             trancheStudent: tranche.id,
             complete: false
             },
             {
               em:this.em
             })
             // ici je dois verifier si l'accumulation de toutes les montants des avances d'une inscription
             this.trancheStudent.saveTranche(tranche.id)
             this.avanceTrancheRepository.persistAndFlush(avanceTranche)
             return avanceTranche
           
        }
       
           tranche.complete = true
           avanceTranche.complete=true
           this.trancheStudent.saveTranche(tranche.id)
           this.avanceTrancheRepository.persistAndFlush(avanceTranche)
           return avanceTranche
        }
          

        tranche.complete = true
        this.trancheStudent.saveTranche(tranche.id)
        this.avanceTrancheRepository.persistAndFlush(avanceTranche)
        return avanceTranche
      }


    async saveAvanceTranche(id:string,new_tranche_amount:number){
      const tranche = await this.trancheStudent.findById(id)


        const avance = new AvanceTranche()


        wrap(avance).assign({
          name: tranche.name,
          description: tranche.description,
          createdAt: tranche.createdAt,
          montant:tranche.montant,
          reste: new_tranche_amount - tranche.montant
        },
        {
          em: this.em,
        },
        );
    
        await this.avanceTrancheRepository.persistAndFlush(avance);
    
        return avance
    };
    
    findByOneavancetranche(filters: FilterQuery<AvanceTranche>): Promise<AvanceTranche | null> {
        return this.avanceTrancheRepository.findOne(filters);
      }
    findByIdavancetranche(id:string){
        return this.avanceTrancheRepository.findOne(id)
      }
    
    getAllavancetranche(): Promise<AvanceTranche[]> {
        return this.avanceTrancheRepository.findAll()
      }
    
      
    async update(id:string, input: AvanceTrancheUpdateInput): Promise<AvanceTranche> {
        const avance = await this.findByIdavancetranche(id)
          if (input.tranche) {
              const tranche =
              input.tranche_id &&
                (await this.trancheStudent.findByOne({ id: input.tranche_id}));
        
              if (!tranche) {
                throw new NotFoundError('inscription no exist' || '');
              }
              this.trancheStudent.update(tranche.id, input.tranche);
          }
  
   
          wrap(avance).assign({
              name:input.name || avance.name,
              montant: input.montant || avance.montant,
              description: input.description || avance.description,
          },
          { em: this.em },
          );
          await this.avanceTrancheRepository.persistAndFlush(avance);
          return avance;
      }


    async deleteavancetranche(id:string):Promise<AvanceTranche>{
      const a = this.findByIdavancetranche(id)
      await this.avanceTrancheRepository.removeAndFlush(a);
      if(!a){
       throw console.error("not found");
      }
      return a
    }

}