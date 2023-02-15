/* eslint-disable prettier/prettier */
import {
    Entity,
    EntityManager,
    FilterQuery,
    NotFoundError,
    wrap,
  } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FraisInscription } from 'src/entities/frais-inscription.entity';
import { AnneeAccademiqueService } from '../anne_accademique/anne-accademique.service';
import { SalleService } from '../salle/salle.service';
import { FraisInscriptionInput } from './dto/frais-inscription.input';
import { UpdateFraisInscriptionInput } from './dto/frais-inscription.update';

@Entity()
@ObjectType()
export class FraisInscriptionService {
    constructor(
        @InjectRepository(FraisInscription)
        private fraisRepository: EntityRepository<FraisInscription>,
        private salleService: SalleService,
        private anneAccademique: AnneeAccademiqueService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: FraisInscriptionInput,
      ): Promise<FraisInscription> {  
        const frais = new FraisInscription()

        const anneAccademique = input.anneeAccademique
        ? await this.anneAccademique.findbyOne({id:input.anneeAccademique.ID})
        : await this.anneAccademique.create(input.anneeAccademique)

        const salle = input.salle
        ? await this.salleService.findByOne({id:input.salle.ID})
        : await this.salleService.create(input.salle)


        frais.montant = input.montant
        frais.description = input.description || null
        frais.salle.id = salle.id
        frais.anneeAccademique.id = anneAccademique.id
        
        await this.fraisRepository.persistAndFlush(frais)
        return frais
      }
    
      findByOne(filters: FilterQuery<FraisInscription>): Promise<FraisInscription | null> {
        return this.fraisRepository.findOne(filters);
      }
      findById(id:string){
        return this.fraisRepository.findOne(id)
      }
    
      getAll(): Promise<FraisInscription[]> {
        return this.fraisRepository.findAll()
      }
      
      async update(id:string,input: UpdateFraisInscriptionInput): Promise<FraisInscription> {
        const frais = await this.findById(id)
        if (input.salle) {
            const salle =
            input.salle?.ID &&
              (await this.salleService.findByOne({ id: input.salle?.ID }));
      
            if (!salle) {
              throw new NotFoundError('salle no exist' || '');
            }
            this.salleService.update(salle.id, input.salle);
          }

          if (input.anneeAccademique) {
            const annee =
            input.anneeAccademique?.ID &&
              (await this.anneAccademique.findbyOne({ id: input.anneeAccademique?.ID }));
      
            if (!annee) {
              throw new NotFoundError('annee no exist' || '');
            }
            this.anneAccademique.update(annee.id, input.anneeAccademique);
          }
        
        wrap(frais).assign({
            montant: input.montant || frais.montant,
            description: input.description || frais.description,
            dateLine: input.dateLine || frais.dateLine
        },
        { em: this.em },
    );
        await this.fraisRepository.persistAndFlush(frais);
        return frais;
      }
      async delete(id:string){
        const a = this.findById(id) 
        await this.fraisRepository.removeAndFlush(a)
        if(!a){
        throw Error("not found")
        }
        return a
      }   
}