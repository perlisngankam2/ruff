/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    EntityManager,
    FilterQuery,
    Loaded,
    NotFoundError,
    wrap,
  } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Cycle } from 'src/entities/cycle.entity';
import { NiveauEtude } from 'src/entities/niveau-etude.entity';
import { Salle } from 'src/entities/salle.entity';
import { SectionCycleService } from '../section-cycle/section-cycle.service';
import { NiveauEtudeCreateInput } from './dto/niveau-etude.input';
import { NiveauEtudeUpdateInput } from './dto/niveau-etude.update';
import { CycleService } from '../cycle/cycle.service';
// import { cy } from 'date-fns/locale';

@Injectable()
export class NiveauEtudeService {
    constructor(
        @InjectRepository(NiveauEtude)
        private niveauEtudeRepository: EntityRepository<NiveauEtude>,
        private cycleservice: CycleService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: NiveauEtudeCreateInput,
      ): Promise<NiveauEtude> {  
        const niveauEtude = new NiveauEtude()

        // const sectionCycle = input.sectionCycle
        // ? await this.sectionCycle.findByOne({id:input.section})
        // : await this.sectionCycle.create(input.sectionCycle)

        wrap(niveauEtude).assign(
          {
           name: input.name,
           description: input.description,
          //  sectionCycle: sectionCycle.id,
          //  salle: input.salle,
           cycle: input.cycleId,
           montantPension: input.montantPension
          },
          {
            em:this.em
          }
        )

        await this.niveauEtudeRepository.persistAndFlush(niveauEtude)
        return niveauEtude
      }
    
      findByOne(filters: FilterQuery<NiveauEtude>): Promise<NiveauEtude | null> {
        return this.niveauEtudeRepository.findOne(filters);
      }
      findById(id:string){
        return this.niveauEtudeRepository.findOne(id)
      }

      async findcyclebyniveau(niveauid:string){
        return (await this.findByOne(niveauid)).cycle.load()
       }
      
      async getAll() {
        const niveaus= this.niveauEtudeRepository.findAll({
          populate:['cycle','salle.student','cycle.salle.student']
        })
        return niveaus
  
      }

      async update(id:string, input: NiveauEtudeUpdateInput): Promise<NiveauEtude> {
        const niveau = await this.findById(id)
        const cycle = await this.cycleservice.findById(input.cycleId)
        if(!cycle){
          throw   Error("!!!!!!!CYCLE DOES NOT EXISTS!!!!!!!!!!!!!!!!!!")
        }
        // if (input.sectionCycle) {
        //     const section =
        //     input.sectionCycle?.ID &&
        //       (await this.sectionCycle.findByOne({ id: input.sectionCycle?.ID }));
      
        //     if (!section) {
        //       throw new NotFoundError('section no exist' || '');
        //     }
        //     this.sectionCycle.update(section.id, input.sectionCycle);
        //   }
        wrap(niveau).assign({
            name: input.name || niveau.name,
            description: input.description || niveau.description,
            // salle : input.salle  || niveau.salle,
            cycle : input.cycleId||niveau.cycle,
            montantPension : input.montantPension  || niveau.montantPension
            
        },
        { em: this.em },
    );
        await this.niveauEtudeRepository.persistAndFlush(niveau);
        return niveau;
      }

      async delete(id:string){
        const a = await this.findById(id)
        await this.niveauEtudeRepository.removeAndFlush(a)
        if(!a){
        throw Error("not found")
        }
        return a
      }   

      // gestion des inscription par niveau etude(classe)
      async etatInscriptionNiveau(id:string){
        const niveau = await this.niveauEtudeRepository.findOneOrFail(id)
        const salle = niveau.salle
        const frais = salle[0].fraisInscription.getEntity().montant
        let montantAttendu = 0
        let montantRecu = 0
        for(let i = 0 ; i<salle.length ; i++){
          montantAttendu += ((salle[i].effectif)*frais)

          const inscription = salle[i].fraisInscription.getEntity().inscription
          for(let j = 0 ; j < inscription.length; j++){
              montantRecu += inscription[i].montant
          }
        }

        return {
          "niveauEtude":niveau,
            "montantAttendu": montantAttendu,
            "montantRecu": montantRecu,
            "RAR": montantAttendu - montantRecu,
            "TRAR":(( montantAttendu - montantRecu)/montantAttendu)*100
        }


      }
}