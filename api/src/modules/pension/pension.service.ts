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
import { Pension } from 'src/entities/pension.entity';
import { AnneeAccademiqueService } from '../anne_accademique/anne-accademique.service';
import { NiveauEtudeService } from '../niveau_etude/niveau-etude.service';
import { SalleService } from '../salle/salle.service';
import { PensionCreateInput } from './dto/pension.input';
import { PensionUpdateInput } from './dto/pension.update';


@Injectable()
export class PensionService {
    constructor(
        @InjectRepository(Pension)
        private pensionRepository: EntityRepository<Pension>,
        private salleService: SalleService,
        private anneAccademique: AnneeAccademiqueService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: PensionCreateInput,
      ): Promise<Pension> {  
        const pension = new Pension()

        const anneAccademique = input.anneeAccademique
            ? await this.anneAccademique.findbyOne({id:input.anneeAcademique_id})
            : await this.anneAccademique.create(input.anneeAccademique)

        const salle = input.salle
            ? await this.salleService.findByOne(input.salle_id)
            : await this.salleService.create(input.salle)

        wrap(pension).assign(
          {
            montant:input.montant,
            name: input.name,
            description: input.description,
            salle: salle.id,
            anneeAccademique: anneAccademique.id
          },
          {
            em:this.em
          }
        )
        
        await this.pensionRepository.persistAndFlush(pension)
        return pension
      }
    
      findByOne(filters: FilterQuery<Pension>): Promise<Pension | null> {
        return this.pensionRepository.findOne(filters);
        }
      findById(id:string){
        return this.pensionRepository.findOne(id)
        }
    
      getAll(): Promise<Pension[]> {
        return this.pensionRepository.findAll()
      }
      
      async update(id:string, input: PensionUpdateInput): Promise<Pension> {
        const pension = await this.findById(id)
        if (input.salle) {
            const salle =
            input.salle_id &&
              (await this.salleService.findByOne({ id: input.salle_id }));
      
            if (!salle) {
              throw new NotFoundError('salle no exist' || '');
            }
            this.salleService.update(salle.id, input.salle);
          }

          if (input.anneeAccademique) {
            const annee =
            input.anneeAcademique_id &&
              (await this.anneAccademique.findbyOne({ id: input.anneeAcademique_id }));
      
            if (!annee) {
              throw new NotFoundError('annee no exist' || '');
            }
            this.anneAccademique.update(annee.id, input.anneeAccademique);
          }
        
        wrap(pension).assign({
            name:input.name || pension.name,
            montant: Number(input.montant) || Number(pension.montant) || 0.0,
            description: input.description || pension.description,
            dateLine: input.dateLine || pension.dateLine
        },
        { em: this.em },
    );
        await this.pensionRepository.persistAndFlush(pension);
        return pension;
      }
      async delete(id:string){
        const a = this.findById(id)
        await this.pensionRepository.removeAndFlush(a)
        if(!a){
        throw Error("not found")
        }
        return a
      }   
}