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
import { Student } from 'src/entities/student.entity';
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
        const student = new Student()

        // const localisation = input.localisation
        //     ? await this.localisationService.findByOne({id:input.localisation.ID})
        //     : await this.localisationService.create(input.localisation)
        
        //  const inscription = input.inscription
        //      ? await this.inscriptionService.findByOne({id:input.inscription_id})
        //   : await this.inscriptionService.create(input.inscription)

        // const salle = input.salle
        //     ? await this.salleService.findByOne({id:input.salle.ID})
        //     : await this.salleService.create(input.salle)

        // const user = input.user
        //     ? await this.userService.findByOne({id:input.user.ID})
        //     : await this.userService.create(input.user)
        wrap(student).assign(
          {
            matricule: input.matricule,
            firstname: input.firstname,
            lastname: input.lastname,
            classe : input.classe,
            sex: input.sex,
            dateOfBirth:input.dateOfBirth,
            adress:input.adress,
            transport:input.transport,
            categorie : input.categoryStudent,
            fatherFirstName:input.fatherFirstName,
            fatherLastName:input.fatherLastName,
            fatherPhoneNumber:input.fatherPhoneNumber,
            fatherProfession:input.fatherProfession,
            motherFirstName:input.motherFirstName,
            motherLastName:input.motherLastName,
            motherPhoneNumber:input.motherPhoneNumber,
            motherProfession:input.motherProfession,
            tutorFirstName:input.tutorFirstName,
            tutorLastName:input.tutorLastName,
            tutorPhoneNumber:input.tutorPhoneNumber,
            tutorProfession:input.tutorProfession,
          },
          {
            em:this.em
          }
        )
        // student.salle.id = salle.id,
        // student.inscription.id = inscription.id,
        // student.user.id = user.id,
        // student.localisation.id = localisation.id
        
        await this.studentRepository.persistAndFlush(student)
        return student
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
            matricule:input.matricule,
            firstname:input.firstname,
            lastname:input.lastname,
            classe:input.classe,
            sex:input.sex,
            dateOfBirth:input.dateOfBirth,
            adress:input.adress,
            // exclut: input.exclut || student.exclut,
            // old: input.old,
            transport:input.transport,
            categorie:input.categoryStudent,
            fatherFirstName:input.fatherFirstName,
            fatherLastName:input.fatherLastName,
            fatherPhoneNumber:input.fatherPhoneNumber,
            fatherProfession:input.fatherProfession,
            motherFirstName:input.motherFirstName,
            motherLastName:input.motherLastName,
            motherPhoneNumber:input.motherPhoneNumber,
            motherProfession:input.motherProfession,
            tutorFirstName:input.tutorFirstName,
            tutorLastName:input.tutorLastName,
            tutorProfession:input.tutorProfession
           // lastSchool:input.lastSchool || student.lastSchool,
        },
        { em: this.em },
    );
        await this.studentRepository.persistAndFlush(student);
        return student;
      }

      
    async delete(id:string){
      const a = this.findById(id)
      await this.studentRepository.nativeDelete(await a)
      if(!a){
      throw Error("not found")
      }
      return a
        
      }   
}