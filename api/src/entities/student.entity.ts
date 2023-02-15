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
  @Property({ nullable:true })
  matricule!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  firstname!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  lastname!: string;

  @Field(()=>Date,{ nullable:true })
  @Property({ nullable:true})
  date_of_birth=new Date();

  @Field({ nullable: true })
  @Property({ nullable: true })
  sex!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  class!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  adress!: string;

  @Field({ defaultValue: false })
  @Property({ default: false })
  transport!: boolean;

  @Field({ defaultValue: false })
  @Property({ default:false })
  old!: boolean;

  @Field({ defaultValue: false })
  @Property({ default:false })
  exclut!: boolean;

  @Field({ defaultValue: false })
  @Property({ default:false })
  inscriptionComplete!: boolean;

  @Field({ nullable: true })
  @Property({ nullable: true })
  lastSchool!: string;
  
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
  user!: IdentifiedReference<User>|null;

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

  // @ManyToOne(() => Inscription, {
  //   nullable: true,
  //   onDelete: 'CASCADE',
  // })
  // inscription!: IdentifiedReference<Inscription> | null;

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