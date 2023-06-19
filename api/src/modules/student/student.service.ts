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
import { Regime, Student } from 'src/entities/student.entity';
import { TrancheStudent } from 'src/entities/tranche-student.entity';
import { CategorieEleveService } from '../categorie_eleve/categorie-eleve.service';
import { InscriptionService } from '../inscription/inscription.service';
import { LocalisationService } from '../localisation/localisation.service';
import { SalleService } from '../salle/salle.service';
import { TrancheStudentService } from '../tranche-student/tranche-student.service';
import { UserService } from '../user/user.service';
import { StudentCreateInput } from './dto/student.input';
import { StudentUpdateInput } from './dto/student.update';
import { TrancheService } from '../tranche/tranche.service';
import { addDays, format } from 'date-fns';
import { PaginatedResponse, PaginationInput, paginate } from 'src/pagination';
import { StudentPaginatedResponse } from './type/studentpagination';
import { CategorieEleve } from 'src/entities/categorie-eleve.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: EntityRepository<Student>,
    private salleService: SalleService,
    private trancheservice: TrancheService,
    private localisationService: LocalisationService,
    private categorieService: CategorieEleveService,
    // private inscriptionService: InscriptionService,
    private userService: UserService,
    private em: EntityManager,
  ) {}

  async create(input: StudentCreateInput): Promise<Student> {
    const student = new Student();

    // const localisation = input.localisation
    //     ? await this.localisationService.findByOne({id:input.localisation.ID})
    //     : await this.localisationService.create(input.localisation)

    //  const inscription = input.inscription
    //      ? await this.inscriptionService.findByOne({id:input.inscription_id})
    //   : await this.inscriptionService.create(input.inscription)

    const salle = await this.salleService.findByOne({ id: input.salleId });
    const categorie_eleve = await this.categorieService.findByOne({
      id: input.categoryStudentId,
    });

    // const user = input.user
    //     ? await this.userService.findByOne({id:input.user.ID})
    //     : await this.userService.create(input.user)
    wrap(student).assign(
      {
        matricule: input.matricule,
        firstname: input.firstname,
        lastname: input.lastname,
        repeating: input.repeating,
        // classe : input.classe,
        sex: input.sex,
        dateOfBirth: input.dateOfBirth,
        birthPlace: input.birthPlace,
        adress: input.adress,
        // transport:input.transport,
        categorie: categorie_eleve,
        salle: salle,
        fatherFirstName: input.fatherFirstName,
        fatherLastName: input.fatherLastName,
        fatherPhoneNumber: input.fatherPhoneNumber,
        fatherProfession: input.fatherProfession,
        motherFirstName: input.motherFirstName,
        motherLastName: input.motherLastName,
        motherPhoneNumber: input.motherPhoneNumber,
        motherProfession: input.motherProfession,
        tutorFirstName: input.tutorFirstName,
        tutorLastName: input.tutorLastName,
        tutorPhoneNumber: input.tutorPhoneNumber,
        tutorProfession: input.tutorProfession,
      },
      {
        em: this.em,
      },
    );
    // student.salle.id = salle.id,
    // student.inscription.id = inscription.id,
    // student.user.id = user.id,
    // student.localisation.id = localisation.id

    await this.studentRepository.persistAndFlush(student);
    return student;
  }

  findByOne(filters: FilterQuery<Student>): Promise<Student | null> {
    return this.studentRepository.findOne(filters, {
      populate: ['salle', 'categorie'],
    });
  }

  findById(id: string) {
    return this.studentRepository.findOne(id);
  }

  async findAllStudentSpecialRegime() {
    const cat = (await this.categorieService.getAll())
      .filter((a) => a.nom == 'Candidat special')
      .map((a) => a.id)[0];
    const a = await this.studentRepository.findAll({
      populate: [
        'salle',
        'pension',
        'salle.niveau',
        'salle.niveau.cycle',
        'salle.niveau.cycle.section',
        'trancheStudent',
        'trancheStudent.tranche',
      ],
    });

    return a.filter(async (a) => a.categorie.id == cat);
  }

  async findAllStudentNormalRegime() {
    const cat = (await this.categorieService.getAll())
      .filter((a) => a.nom == 'Candidat libre')
      .map((a) => a.id)[0];
    const a = await this.studentRepository.findAll({
      populate: [
        'salle',
        'pension',
        'trancheStudent',
        'trancheStudent.tranche',
      ],
    });

    return a.filter(async (a) => a.categorie.id == cat);
  }

  async findStudentTel(id: string) {
    return (await this.findByOne(id)).parentTel;
  }

  async findStudentFirstNameById(id: string) {
    const a = await this.studentRepository.findOne(id);
    return a.firstname;
  }

  async findStudentLastNameById(id: string) {
    const a = await this.studentRepository.findOne(id);
    return a.lastname;
  }

  getAll(): Promise<Student[]> {
    return this.studentRepository.findAll({
      populate: [
        'salle.tranche',
        'salle',
        'pension',
        'salle.niveau.cycle',
        'salle.niveau.cycle.section',
        'trancheStudent',
        'categorie',
      ],
    });
  }

  async getLastThreeStudents(): Promise<Student[]> {
    const a = this.getAll();
    return (await a).slice(-3);
  }

  async pagiantionResponseStudent(
    input: PaginationInput,
  ): Promise<StudentPaginatedResponse> {
    const qb = this.studentRepository.createQueryBuilder(); // Create a QueryBuilder

    const result = await paginate<Student>(qb, input); // Use the paginate function

    // Create a PaginatedResponse instance with the result
    const paginatedResponse = PaginatedResponse(Student);
    paginatedResponse.items = result.items;
    paginatedResponse.total = result.total;
    paginatedResponse.hasMore = result.hasMore;

    return paginatedResponse;
  }

  async getAllForUseAnglophone(): Promise<Student[]> {
    const a = await this.studentRepository.findAll({
      populate: [
        'salle',
        'pension',
        'salle.niveau',
        'salle.niveau.cycle',
        'salle.niveau.cycle.section',
        'salle.pensionsalle',
      ],
    });
    return a.filter(
      async (a) =>
        (
          await (
            await (await (await a.salle.load()).niveau.load()).cycle.load()
          ).section.load()
        ).name === 'Anglophone',
    );
  }

  async getAllForUseFrancophone(): Promise<Student[]> {
    const a = await this.studentRepository.findAll({
      populate: [
        'salle',
        'pension',
        'salle.niveau',
        'salle.niveau.cycle',
        'salle.niveau.cycle.section',
        'salle.pensionsalle',
      ],
    });
    return a.filter(
      async (a) =>
        (
          await (
            await (await (await a.salle.load()).niveau.load()).cycle.load()
          ).section.load()
        ).name == 'Francophone',
    );
  }

  async update(id: string, input: StudentUpdateInput): Promise<Student> {
    const student = await this.findById(id);

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

    wrap(student).assign(
      {
        matricule: input.matricule,
        firstname: input.firstname,
        lastname: input.lastname,
        // classe:input.classe,
        sex: input.sex,
        dateOfBirth: input.dateOfBirth,
        adress: input.adress,
        // exclut: input.exclut || student.exclut,
        // old: input.old,
        // transport:input.transport,
        categorie: input.categoryStudentId,
        salle: input.salleId,
        fatherFirstName: input.fatherFirstName,
        fatherLastName: input.fatherLastName,
        fatherPhoneNumber: input.fatherPhoneNumber,
        fatherProfession: input.fatherProfession,
        motherFirstName: input.motherFirstName,
        motherLastName: input.motherLastName,
        motherPhoneNumber: input.motherPhoneNumber,
        motherProfession: input.motherProfession,
        tutorFirstName: input.tutorFirstName,
        tutorLastName: input.tutorLastName,
        tutorProfession: input.tutorProfession,
        // lastSchool:input.lastSchool || student.lastSchool,
      },
      { em: this.em },
    );
    await this.studentRepository.persistAndFlush(student);
    return student;
  }

  async delete(id: string) {
    const a = await this.findById(id);
    await this.studentRepository.removeAndFlush(await a);
    if (!a) {
      throw Error('not found');
    }
    return a;
  }

  async findTrancheStudentByStudent(studentid: string) {
    return (await this.em.find(TrancheStudent, { student: studentid }))[0];
  }

  async findlisttranche(studentid: string) {
    const a = await this.findByOne(studentid);
    const b = (await a.salle.load()).id;
    const c = (await this.trancheservice.findBysalle(b)).map((a) => a.montant);
    return c;
  }

  async findlistfees(studentid: string) {
    const a = await this.findByOne(studentid);
    const b = (await a.salle.load()).id;
    const c = await this.trancheservice.findBysalle(b);
    return c;
  }

  async getclassfeebystudent(studentid: string) {
    const students = await this.studentRepository.findAll({
      populate: ['salle', 'salle.pensionsalle'],
    });
    const student = students.filter((a) => a.id == studentid)[0];

    if (!student) {
      throw Error('student not found');
    }
    return student.salle
      .getEntity()
      .pensionsalle.getItems()
      .map((a) => a.montantPension)[0];
  }
}
