/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    Enum,
    IdentifiedReference,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryKey,
    Property,
  } from '@mikro-orm/core';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PrimaryKeyUuid } from '../decorators/PrimaryKeyUuid.decorator';
import { InscriptionInput } from 'src/modules/inscription/dto/inscription.input';
import { CategorieEleve } from './categorie-eleve.entity';
import { Inscription } from './inscription.entity';
import { Localisation } from './localisation.entity';
import { Parent } from './parent.entity';
import { ParentStudent } from './parentStudent.entity';
import { Salle } from './salle.entity';
import { TrancheStudent } from './tranche-student.entity';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Student {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({ unique:false })
  matricule!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  firstname!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  lastname!: string;

  @Field({ defaultValue: false })
  @Property({ default: false })
  dateOfBirth!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  sex!: string;

  // @Field({ nullable: true })
  // @Property({ nullable: true })
  // classe!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  adress!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  transport!: string;

  // @Field({ defaultValue: false })
  // @Property({ default:false })
  // old!: boolean;

  
  @Field({ nullable: true })
  @Property({ nullable: true })
  fatherFirstName!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  fatherLastName!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  fatherPhoneNumber!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  fatherProfession!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  motherFirstName!: string;

  @Field({ defaultValue: false })
  @Property({ default:false })
  motherLastName!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  motherPhoneNumber!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  motherProfession!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  tutorFirstName!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  tutorLastName!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  tutorPhoneNumber!: string;
  
  @Field({ nullable: true })
  @Property({ nullable: true })
  tutorProfession!: string;

  // @Field({ defaultValue: false })
  // @Property({ default:false })
  // exclut!: boolean;

  // @Field({ defaultValue: false })
  // @Property({ default:false })
  // inscriptionComplete!: boolean;

  // @Field({ nullable: true })
  // @Property({ nullable: true })
  // lastSchool!: string;
  
  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  // Relations
  @OneToOne(() => User, (user) => user.student, {
    nullable:true,
    owner: true,
    unique: true,
    onDelete: 'CASCADE',
  })
  user!: IdentifiedReference<User>;

  @ManyToOne(() => Salle ,{
    nullable:true,
    onDelete:'SET NULL'
  })
  salle!:IdentifiedReference<Salle>|null

  @ManyToOne(() => CategorieEleve ,{
    nullable:true,
    onDelete:'SET NULL'
  })
  categorie!:IdentifiedReference<CategorieEleve>|null

  @ManyToOne(() => Localisation ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  localisation!:IdentifiedReference<Localisation>|null


  @OneToOne(() => Inscription, (inscription) => inscription.student, {
    owner: false,
    nullable: true,
  })
  inscription!: IdentifiedReference<Inscription> | null;
  
  @OneToMany(()=>TrancheStudent, (tranche) => tranche.student)
  trancheStudent = new Collection<TrancheStudent>(this)

  @OneToMany(()=>ParentStudent, (parentStudent) => parentStudent.student)
  parentStudent = new Collection<ParentStudent>(this)
}