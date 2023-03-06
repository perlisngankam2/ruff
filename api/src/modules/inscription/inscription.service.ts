/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    EntityManager,
    Enum,
    Filter,
    FilterQuery,
    IdentifiedReference,
    ManyToOne,
    NotFoundError,
    wrap,
  } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { forwardRef, Inject } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AvanceInscription } from 'src/entities/avance-inscription.entity';
import { FraisInscription } from 'src/entities/frais-inscription.entity';
import { Inscription } from 'src/entities/inscription.entity';
import { AnneeAccademiqueService } from '../anne_accademique/anne-accademique.service';
import { AvanceInscriptionService } from '../avance-inscription/avance-inscription.service';
import { FraisInscriptionService } from '../frais-inscription/frais-inscription.service';
import { NiveauEtudeService } from '../niveau_etude/niveau-etude.service';
import { StudentService } from '../student/student.service';
import { InscriptionUpdateInput } from './dto/incription.update';
import { InscriptionInput } from './dto/inscription.input';

@Entity()
@ObjectType()
export class InscriptionService {
    constructor(
        @InjectRepository(Inscription)
        private inscriptionRepository: EntityRepository<Inscription>,
        // private salleService: NiveauEtudeService,
        private anneAccademique: AnneeAccademiqueService,
        @Inject(forwardRef(() => AvanceInscriptionService))
        private avanceInscription: AvanceInscriptionService,
        private studentService: StudentService,
        private fraisService:FraisInscriptionService,
        private  em: EntityManager,
      ) {}
    
    //HERE WE ONLY INITIALIZE OUR ADMISSION 
    async create(
        input: InscriptionInput,
      ): Promise<Inscription> {  
        const inscription = new Inscription()

        const anneAccademique = input.anneeAccademique
            ? await this.anneAccademique.findbyOne({id:input.anneacademiqueId})
            : await this.anneAccademique.create(input.anneeAccademique)

        const student = input.student
            ? await this.studentService.findByOne({id: input.studentId})
            : await this.studentService.create(input.student)

        const frais = input.fraisInscription
          ? await this.fraisService.findByOne({id: input.fraisincription_id})
          : await this.fraisService.create(input.fraisInscription)

        wrap(inscription).assign(
          {
          montant: Number(input.montant) || 0.0,
          description: input.description,
          dateLine: input.dateLine,
          anneeAccademique: anneAccademique.id,
          student: student.id,
          fraisInscription: frais.id,
          salle: input.salleId
          },
          {
            em:this.em
          }
        )
        // inscription.complete = false
        // await this.inscriptionRepository.persistAndFlush(inscription)
        // console.log(inscription)

        // check last avance if the reste == 0 close inscription

        // check categorie Student and get if he has the reduction for inscription
        // const categorie_student = student.categorie.load()
        // console.log('===========>'+student.categorie.load())
        // // console.log(student.categorie.getEntity)
        // const retenu_categorie = (await categorie_student).reductionScolarite.load()
  
        // if((await retenu_categorie).pourcentage != 0){
        //     const new_amount_incription =frais.montant - (await retenu_categorie).pourcentage*frais.montant 
        //     if(inscription.montant !== new_amount_incription){
        //         // create the avance inscription
        //         const inscript = await this.findByOne({
        //           anneeAccademique: inscription.anneeAccademique.id,
        //           student: inscription.student.id,
        //           fraisInscription: inscription.fraisInscription.id
        //         })

        //         // console.log('===========>'+inscript)
        //         await this.avanceInscription.saveAvanceTranche(inscript.id,new_amount_incription)
        //     }
        //     inscription.complete = true
        //     await this.inscriptionRepository.persistAndFlush(inscription)
        //     return inscription
        //   }

        // if((await retenu_categorie).montant != 0 ){
        //     const new_amount_incription =frais.montant - (await retenu_categorie).montant 
        //     if(inscription.montant !== new_amount_incription){
        //         // create the avance inscription  
        //         const inscript = await this.findByOne({
        //           anneeAccademique: inscription.anneeAccademique.id,
        //           student: inscription.student.id,
        //           fraisInscription: inscription.fraisInscription.id
        //         })
                  
        //         await this.inscriptionRepository.persistAndFlush(inscript)
        //         return inscript
        //         // await this.avanceInscription.saveAvanceTranche(inscript.id,new_amount_incription)
        //     } 
        //     inscription.complete = true
        //     await this.inscriptionRepository.persistAndFlush(inscription)
        //     return inscription
        // }
        // if(input.montant !== frais.montant){
        //     // create avance inscription
        //     const new_amount_incription = 0
        //     const inscript = await this.findByOne({
        //       montant: inscription.montant,
        //       anneeAccademique: inscription.anneeAccademique
        //     })
        //     await this.avanceInscription.saveAvanceTranche(inscript.id,new_amount_incription)
        // }


        // je  dois d'abord recuperer tous les montants des avances avant da la stocker dans la table inscription
        //montant_de_toutes les avance = 
        if(input.montant<frais.montant){
          inscription.complete=false
          await this.inscriptionRepository.persistAndFlush(inscription)
          return inscription
        }
        if(input.montant<frais.montant){
          inscription.reste = input.montant - frais.montant
          inscription.complete = true
          await this.inscriptionRepository.persistAndFlush(inscription)
          return inscription

        }
        inscription.complete = true
        await this.inscriptionRepository.persistAndFlush(inscription)
        return inscription
}


    
      findByOne(filters: FilterQuery<Inscription>): Promise<Inscription | null> {
        return this.inscriptionRepository.findOne(filters);
      }
      findById(id:string){
        return this.inscriptionRepository.findOne(id)
      }
    
      getAll(): Promise<Inscription[]> {
        return this.inscriptionRepository.findAll()
      }
      
    async findOrFailled(id:string):Promise<Inscription>{
        const inscription = await this.inscriptionRepository.findOneOrFail(id)
        return inscription
    }
    

    async update(id:string, input: InscriptionUpdateInput): Promise<Inscription> {
      const inscription =await this.findById(id)
        if (input.fraisInscription) {
            const fraisInscription =
            input.fraisincription_id &&
              (await this.fraisService.findByOne({ id: input.fraisincription_id }));
      
            if (!fraisInscription) {
              throw new NotFoundError('frais inscripton no exist' || '');
            }
            this.fraisService.update(fraisInscription.id, input.fraisInscription);
          }

        if (input.student) {
            const student =
            input.studentId &&
              (await this.studentService.findByOne({ id: input.studentId }));
      
            if (!student) {
              throw new NotFoundError('student no exist' || '');
            }
            this.studentService.update(student.id, input.student);
          }

          if (input.anneeAccademique) {
            const annee =
            input.anneacademiqueId &&
              (await this.anneAccademique.findbyOne({ id: input.anneacademiqueId }));
      
            if (!annee) {
              throw new NotFoundError('annee no exist' || '');
            }
            this.anneAccademique.update(annee.id, input.anneeAccademique);
          }
        
        wrap(inscription).assign({
            montant: Number(input.montant) || Number(inscription.montant) || 0.0,
            description: input.description || inscription.description,
            name: input.name|| inscription.name,
            salle: input.salleId || inscription.salle   
        },
        { em: this.em },
        );
        await this.inscriptionRepository.persistAndFlush(inscription);
        return inscription;
    }

    async deleteInscription(id:string){
      const a= this.findById(id)
      await this.inscriptionRepository.removeAndFlush(a)  
      if(!a){
      throw Error("not found")
      }
      return a
    }   

    //THIS FUNCTION PERMITS US TO CHANGE THE AMOUNT OF OUR ADMISSION ACCORDING TO ALL ITS ADAVNCES AND BASED ON OTHER CONDITIONS
    async saveInscription(id:string){
        const inscription = await this.inscriptionRepository.findOneOrFail(id)
        //ici je recuperer la somme cummulle de toutes les avances d'une inscription 
        const cumulative_tuition_advances = this.avanceInscription.getallcorrespondingadvances(inscription.id)
        inscription.montant = Number(cumulative_tuition_advances)
        const student = inscription.student.load()
        const categorie_student = (await student).categorie.load()
        const retenu = (await categorie_student).reductionScolarite.load()
        if((await retenu).pourcentage != 0){
            const new_amount_incription =(await inscription.fraisInscription.load()).montant - (await retenu).pourcentage*(await inscription.fraisInscription.load()).montant
            if(inscription.montant >= new_amount_incription){
              inscription.complete = true
              inscription.reste=new_amount_incription-inscription.montant
         }
          }

        if((await retenu).montant != 0 ){
            const new_amount_incription =(await inscription.fraisInscription.load()).montant - (await retenu).montant 
            if(inscription.montant >= new_amount_incription){
                inscription.complete = true
                inscription.reste=new_amount_incription-inscription.montant
           }
        }
        
        if(inscription.montant == (await inscription.fraisInscription.load()).montant){
            inscription.complete = true
            inscription.reste=0.0
        }

        if(inscription.montant < (await inscription.fraisInscription.load()).montant ){
          inscription.complete =false
          inscription.reste=0.0
        }

        if(inscription.montant >(await inscription.fraisInscription.load()).montant ){
          inscription.complete = true
          inscription.reste= inscription.montant-Number((await inscription.fraisInscription.load()).montant )
      }
        await this.inscriptionRepository.persistAndFlush(inscription)
    }
}