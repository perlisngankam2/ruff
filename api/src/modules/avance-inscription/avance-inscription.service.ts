/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    EntityManager,
    FilterQuery,
    IdentifiedReference,
    ManyToOne,
    NotFoundError,
    wrap,
  } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AvanceInscription } from '../../entities/avance-inscription.entity';
import { Inscription } from '../../entities/inscription.entity';
import { InscriptionService } from '../inscription/inscription.service';
import { AvanceInscriptionCreateInput } from './dto/avance-inscription.input';
import { AvanceInscriptionUpdateInput } from './dto/avance-inscription.update';


@Injectable()
export class AvanceInscriptionService {
    constructor(
        @InjectRepository(AvanceInscription)
        private avanceInscriptionRepository: EntityRepository<AvanceInscription>,
        @Inject(forwardRef(() => InscriptionService))
        private inscription: InscriptionService,
        private  em: EntityManager,
      ) {}
    
    async create(
        input: AvanceInscriptionCreateInput,
      ): Promise<AvanceInscription> {  
        const avanceInscription = new AvanceInscription()

        const inscription = input.inscription
            ? await this.inscription.findByOne({id:input.inscription_id})
            : await this.inscription.create(input.inscription)
        
        // const inscriptionStudent = inscription.fraisInscription.load()
        // console.log('===================================>'+inscriptionStudent)
        // const amount = (await inscriptionStudent).montant
        
        

        wrap(avanceInscription).assign(
          {
          montant: Number(input.montant)||0.0,
          name: input.name,
          description: input.description,
          inscription: inscription.id,
          // reste : amount - input.montant
          },
          {
            em: this.em
          }
        )

      const frais = inscription.fraisInscription.load()
      const categorie_student =  (await inscription.student.load()).categorie.load()
      console.log('===========>'+(await inscription.student.load()).categorie.load())
      
      const retenu_categorie = (await categorie_student).reductionScolarite.load()
      console.log(retenu_categorie)


      if((await retenu_categorie).pourcentage != 0){
        const new_amount_incription =(await frais).montant - (await retenu_categorie).pourcentage*(await frais).montant 
         if(input.montant < new_amount_incription){
             // create the avance inscription
            wrap(avanceInscription).assign({
            montant: Number(input.montant),
            name: input.name,
            description: input.description,
            inscription: inscription.id,
            complete: false
            },
            {
              em:this.em
            })
            this.inscription.saveInscription(inscription.id)
            this.avanceInscriptionRepository.persistAndFlush(avanceInscription)
            return avanceInscription
            // console.log('===========>'+inscript)   
         }
         inscription.complete = true
         avanceInscription.complete=true
         this.inscription.saveInscription(inscription.id)
         this.avanceInscriptionRepository.persistAndFlush(avanceInscription)
         return avanceInscription
      }

      
      if((await retenu_categorie).montant != 0 ){
             const new_amount_incription =(await frais).montant - (await retenu_categorie).montant 
             if(input.montant < new_amount_incription){
                 // create the avance inscription  
                 wrap(avanceInscription).assign({
                  montant: Number(input.montant)||0.0,
                  name: input.name,
                  description: input.description,
                  inscription: inscription.id,
                  complete: false
                  },
                  {
                    em:this.em
                  })
                  this.inscription.saveInscription(inscription.id)
                  this.avanceInscriptionRepository.persistAndFlush(avanceInscription)
                  return avanceInscription
             } 
             avanceInscription.complete=true
             
              // ici je dois verifier si l'accumulation de toutes les montants des avances d'une inscription
             this.inscription.saveInscription(inscription.id)
             this.avanceInscriptionRepository.persistAndFlush(avanceInscription)
             return avanceInscription
        }

      if(input.montant < (await frais).montant){
             // create avance inscription
             wrap(avanceInscription).assign({
              montant: Number(input.montant)||0.0,
              name: input.name,
              description: input.description,
              inscription: inscription.id,
              complete: false
              },
              {
                em:this.em
              })
              // ici je dois verifier si l'accumulation de toutes les montants des avances d'une inscription
              this.inscription.saveInscription(inscription.id)
              this.avanceInscriptionRepository.persistAndFlush(avanceInscription)
              return avanceInscription
            
         }
        


      inscription.complete = true  
      this.inscription.saveInscription(inscription.id)
      this.avanceInscriptionRepository.persistAndFlush(avanceInscription)
      return avanceInscription
        
      }

    
    findByOne(filters: FilterQuery<AvanceInscription>): Promise<AvanceInscription | null> {
        return this.avanceInscriptionRepository.findOne(filters);
      }

    async getallcorrespondingadvances(inscription_id:string){
      const tbl = (await this.em.find(AvanceInscription,{inscription: inscription_id})).map(a=>a.montant).reduce(function(a,b){return a+b})
      return tbl
    }

    async getinscriptionadvances(inscription_id:string):Promise<AvanceInscription[]>{
      return (await (this.em.find(AvanceInscription, { inscription: inscription_id }))).map(a => a)
    }

    findById(id:string){
        return this.avanceInscriptionRepository.findOne(id)
      }
    
    getAll(): Promise<AvanceInscription[]> {
        return this.avanceInscriptionRepository.findAll()
      }
    
      
    async update(id:string, input: AvanceInscriptionUpdateInput): Promise<AvanceInscription> {
      const avance = await this.findById(id)
        if (input.inscription) {
            const inscription =
            input.inscription_id &&
              (await this.inscription.findByOne({ id: input.inscription_id}));
      
            if (!inscription) {
              throw new NotFoundError('inscription no exist' || '');
            }
            this.inscription.update(inscription.id, input.inscription);
        }

 
        wrap(avance).assign({
            name:input.name || avance.name,
            montant: input.montant || avance.montant,
            description: input.description || avance.description,
        },
        { em: this.em },
        );
        await this.avanceInscriptionRepository.persistAndFlush(avance);
        return avance;
    }


    async delete(id:string):Promise<AvanceInscription>{
     const a = this.findById(id)
     await this.avanceInscriptionRepository.removeAndFlush(a)
     if(!a){

     }
     return a
    }

    async saveAvanceTranche(id:string,new_inscription_amount:number){

      
      // const inscription = await this.inscription.findById(id)
   
      // const avance = new AvanceInscription()

      // // check if student is complet
      // console.log(inscription)
      // const avancesInscription = await inscription.avanceInscription.matching({orderBy:{paiementDate:'ASC'}})
      

      // if (avancesInscription[0].complete == true){
      //     return 
      // }

      // wrap(avance).assign({
      //   name: inscription.name,
      //   description: inscription.description,
      //   paiementDate: inscription.createdAt,
      //   montant: inscription.montant,
      //   inscription: inscription.id
      // },
      // {
      //   em: this.em
      // })
      
      // if(new_inscription_amount != 0){
      //     avance.reste = new_inscription_amount - inscription.montant
      //     if (avance.reste = 0){
      //         avance.complete = true
      //     }
      // }
      // avance.reste = (await inscription.fraisInscription.load()).montant - inscription.montant
      // // avance.reste = inscription.tranche.getEntity().montant - tranche.montant
      // await this.avanceInscriptionRepository.persistAndFlush(avance)
      // return avance

  }
    

}