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
import { Injectable } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Salle } from 'src/entities/salle.entity';
import { NiveauEtudeService } from '../niveau_etude/niveau-etude.service';
import { SalleCreateInput } from './dto/salle.input';
import { SalleUpdateInput } from './dto/salle.update';

@Injectable()
export class SalleService {
    constructor(
        @InjectRepository(Salle)
        private salleRepository: EntityRepository<Salle>,
        private niveauEtude: NiveauEtudeService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: SalleCreateInput,
      ): Promise<Salle> {        
        const salle = new Salle()
        
        // const niveauid = this.niveauEtude.findById(input.niveauId)
        // if(!niveauid){
        //   throw Error("niveauid not found")
        // }
        // const niveau = input.niveau
        // ? await this.niveauEtude.findByOne({id:input.niveau.ID})
        // : await this.niveauEtude.create(input.niveau)
        wrap(salle).assign(
          {
          name : input.name,
          montantPensionSalle: input.montantPensionSalle,
          niveau : input.niveauEtudeId,
          section : input.sectionId,
          cycle : input.cycleId
          },
          {
            em: this.em
          }
        )




        wrap(salle).assign({
        name: input.name,
        montantPensionSalle: input.montantPensionSalle,
        section: input.sectionId,
        cycle: input.cycleId
        },
        {
          em: this.em
        })
        // salle.montantPension = input.montantPension
        // salle.effectif = input.effectif
        // salle.niveau.id = niveau.id
        
        await this.salleRepository.persistAndFlush(salle)
        return salle
      }
    
      findByOne(filters: FilterQuery<Salle>): Promise<Salle | null> {
        return this.salleRepository.findOne(filters);
      }
      findById(id:string){
        return this.salleRepository.findOne(id)
      }
    
      getAll(): Promise<Salle[]> {
        return this.salleRepository.findAll()
      }

      async deleteSalle(id:string){
        const a = this.findById(id)
        await this.salleRepository.nativeDelete(await a)
          if(!a){
              throw Error("not found")
            }
            return a
      
      }

      async updateSalle(id:string,input:SalleUpdateInput):Promise<Salle>{
        const salle = await this.findById(id)

        wrap(salle).assign({
          name: input.name,
          montantPensionSalle: input.montantPensionSalle,
          section: input.sectionId,
          cycle: input.cycleId,
          niveau: input.niveauEtudeId
          // montantPension : input.montantPension
        },
        {
          em: this.em
        });

        await this.salleRepository.persistAndFlush(salle);
        return salle
        
      }
      
      async update(id:string, input: SalleUpdateInput): Promise<Salle> {
        const salle=await this.findById(id)
        if (input.niveau) {
            const niveau =
            input.niveau &&
              (await this.niveauEtude.findByOne({ id: input.niveau.ID }));
       
            if (!niveau) {
              throw new NotFoundError('niveau no exist' || '');
            }
            this.niveauEtude.update(niveau.id, input.niveau);
          } 
        wrap(salle).assign({
            name: input.name || salle.name,
            montantPensionSalle: input.montantPensionSalle || salle.montantPensionSalle,
            section : input.sectionId|| salle.section,
            cycle : input.cycleId || salle.cycle,
            niveau: input.niveauEtudeId || salle.niveau
            // montantPension: input.montantPension || salle.montantPension
        },
        { em: this.em },
        );
            await this.salleRepository.persistAndFlush(salle);
            return salle;
        }
        async delete(id:string){
        const a=this.findById(id) 
        await this.salleRepository.nativeDelete(await a)  
        if(!a){
        throw Error("not found")
        } 
        return a
      }  
      
      // Montant attendu par salle pension
      async MontantAttendu(id:string){
        const salle = this.salleRepository.findOneOrFail(id)
        const amount  = (await salle).fraisInscription.getEntity().montant
        return amount*(await salle).effectif
      }
       
      // Montant Inscription recu par salle inscription
      async inscriptionRecuSalle(id:string){
        const salle = await this.salleRepository.findOneOrFail(id)
        const fraisInscription = await salle.fraisInscription.load()
        let amount = 0
        const inscription = await fraisInscription.inscription.matching({})
        for(let i = 0 ; i < inscription.length; i++){
          amount += inscription[i].montant
        }
        const montantAttendu = await this.MontantAttendu(id)
        const rar = montantAttendu - amount
        const effectif = inscription.length
        return {
            "salle": salle,
            "amount": amount,
            "effectif":effectif,
            "montant attendu": montantAttendu,
            "RAR": rar,
            "TRAR": (rar/montantAttendu)*100
        }
      }
  // liste des eleve ayant tout payer leur inscription par sale
      async listeInscriptionComplet(id:string){
        const salle = await this.salleRepository.findOneOrFail(id)
        const fraisInscription = salle.fraisInscription.load()
        const liste = []
        const listeInscrit = await (await fraisInscription).inscription.matching({})
        for (let i = 0; i < listeInscrit.length; i++){
          if(listeInscrit[i].complete == true){
            liste.push(listeInscrit[i].student)
          }   
        }
        return liste
      }
    
    // liste des eleves incriptions incompletes
    async listeInscriptionIncomplet(id:string){
        const salle = await this.salleRepository.findOneOrFail(id)
        const fraisInscription = salle.fraisInscription.getEntity()
        const liste = []
        const listeInscrit = await fraisInscription.inscription.matching({})
        for (let i = 0; i < listeInscrit.length; i++){
          if(listeInscrit[i].complete == false){
            liste.push(listeInscrit[i].student)
          }   
      }
      return liste
    }

    async findStudentBySalle(studentid:string){
      return (await this.em.find(Salle,{student:studentid}))[0]
    }
}