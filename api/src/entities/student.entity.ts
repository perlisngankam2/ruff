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
import { AvanceTranche } from './avance-tranche.entity';
import { Pension } from './pension.entity';
import { Expense } from './expense.entity';
import { truncate } from 'fs/promises';

export enum Regime{
  SPECIAL='SPECIAL',
  NORMAL='NORMAL'
}

registerEnumType(Regime, {
  name: 'Regime',
});

@Entity()
@ObjectType()
export class Student {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({unique: true})
  matricule!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  firstname!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  lastname!: string;

  @Field({ nullable: true })
  @Property({nullable:true})
  dateOfBirth!:string;

  @Field({ nullable: true })
  @Property({nullable:true})
  birthPlace!: string;

  @Field({ nullable: false })
  @Property({nullable: false})
  repeating!: string;

  // @Field({ nullable: true })
  // @Enum({
  //   items: () => Regime,
  //   default: Regime.NORMAL,
  // })
  // Regime!: Regime;

  @Field({ nullable: true })
  @Property({ nullable: true })
  sex!: string;

  // @Field({ nullable: true })
  // @Property({ nullable: true })
  // classe!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  adress!: string;

  // @Field({ nullable: true })
  // @Property({ nullable: true })
  // transport!: string;

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

  @OneToMany(()=> Pension, (pension) => pension.student)
  pension = new Collection<Pension>(this)

  @OneToMany(()=>AvanceTranche, (tranche) => tranche.student)
  avancheTranche = new Collection<AvanceTranche>(this)

  @OneToMany(()=>ParentStudent, (parentStudent) => parentStudent.student)
  parentStudent = new Collection<ParentStudent>(this)

  @OneToMany(()=> Expense, (expense) => expense.student)
  expense = new Collection<Expense>(this)

  // @Field(() => ID)
  // @Property({ persist: false })
  // get userid() {
  //   return `${this.user.id}`;
  // }

  @Field(() => ID, { nullable: true })
  @Property({ persist: false })
  get salleid():string|null {
    return this.salle?`${this.salle.id}`:null;
  }

  @Field(() => ID, { nullable: true })
  @Property({ persist: false })
  get salleName(): string | null {
    return this.salle ? `${this.salle.getEntity().name}` : null;
  }
  @Field(() => ID, { nullable: true })
  @Property({ persist: false })
  get categorieid():string|null {
    return this.categorie?`${this.categorie.id}`:null;
  }

  @Field(() => ID, { nullable: true })
  @Property({ persist: false })
  get categoryName(): string | null {
    return this.categorie? `${this.categorie.getEntity().nom}` : null;
  }

  @Field(() => String)
  @Property({ persist: false })
  get parentTel(): string|null {
    return this.parentStudent?`${this.parentStudent.toArray().map(a=>a.parentTel)}`:null;
  }
}