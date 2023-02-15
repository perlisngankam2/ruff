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
import { Localisation } from '../../entities/localisation.entity';
import { Pension } from 'src/entities/pension.entity';
import { Student } from '../../entities/student.entity';
import { User } from '../../entities/user.entity';
import { CategorieEleveService } from '../categorie_eleve/categorie-eleve.service';
import { InscriptionService } from '../inscription/inscription.service';
import { LocalisationService } from '../localisation/localisation.service';
import { SalleService } from '../salle/salle.service';
import { UserService } from '../user/user.service';
import { StudentCreateInput } from './dto/student.input';
import { StudentUpdateInput } from './dto/student.update';

@Entity()
@ObjectType()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: EntityRepository<Student>,
        // private salleService: SalleService,
        private localisationService: LocalisationService,
        private categorieService: CategorieEleveService,
        // private inscriptionService: InscriptionService,
        private userService: UserService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: StudentCreateInput,
      ): Promise<Student> {  
        // let localisation = new Localisation()
        // if(localisation){
        //  localisation = input.localisation
        //     ? await this.localisationService.findByOne({id:input.localisation?.ID})
        //     : await this.localisationService.create(input.localisation)
        // }
        // else throw Error("not found")
        
        // const inscription = input.inscription
        //     ? await this.inscriptionService.findByOne({id:input.inscription.ID})
        //     : await this.inscriptionService.create(input.inscription)

        // const salle = input.salle
        //     ? await this.salleService.findByOne({id:input.salle.ID})
        //     : await this.salleService.create(input.salle)

        const student = new Student()
        
        const categorie = input.categorie
        ? await this.categorieService.findByOne({id:input.categorie_id})
        : await this.categorieService.create(input.categorie)

        if(!categorie){
          throw new Error('categorie student not found');
        }

        try{

        wrap(student).assign(
          {
            firstname: input.firstname,
            lastname: input.lastname,
            class: input.class,
            sex: input.sex,
            date_of_birth : new Date(input.date_of_birth),
            adress: input.adress,
            categorie : categorie.id
          },
          {
            em: this.em,
          },
        );
        // student.salle.id = salle.id,
        // student.inscription.id = inscription.id,
        // student.user.id = user.id
        // student.localisation.id = localisation.id
        
        await this.studentRepository.persistAndFlush(student)
        
        return student
        }
        catch(err){
          // Delete categorie only if it was created for this student
          if (input.categorie) {
            await this.categorieService.deletecategorie(categorie.id);
          }
    
          throw err;

        }
      }
    
      findByOne(filters: FilterQuery<Student>): Promise<Student | null> {
        return this.studentRepository.findOne(filters);
      }
      findById(id:string){
        return this.studentRepository.findOne(id)
      }
    
      getAll(): Promise<Student[]> {
        return this.studentRepository.findAll()
      }
      
      async update(id:string, input: StudentUpdateInput): Promise<Student> {
        const student = await this.findById(id)
        
        // if (input.localisation) {
        //     const localisation =
        //     input.localisation?.ID &&
        //       (await this.localisationService.findByOne({ id: input.localisation?.ID }));
      
        //     if (!localisation) {
        //       throw new NotFoundError('localisation no exist' || '');
        //     }
        //     this.localisationService.update(localisation.id, input.localisation);
        // }

        // if (input.user) {
        //     const user =
        //     input.user?.ID &&
        //       (await this.userService.findByOne({ id: input.user?.ID }));
      
        //     if (!user) {
        //       throw new NotFoundError('user no exist' || '');
        //     }
        //     this.userService.update(user.id, input.user);
        // }
        
        wrap(student).assign({
            firstname:input.firstname,
            lastname:input.lastname,
            class:input.class,
            sex:input.sex,
            date_of_birth:input.date_of_birth,
            adress:input.adress,
            exclut: input.exclut || student.exclut,
            lastSchool:input.lastSchool || student.lastSchool,
        },
        { em: this.em },
    );
        await this.studentRepository.persistAndFlush(student);
        return student;
      }

    async delete(id:string){
      const a = this.findById(id)
      await this.studentRepository.removeAndFlush(a)
      if(!a){
      throw Error("not found")
      }
      return a
        
      }   
}