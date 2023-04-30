/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    Enum,
    Filter,
    IdentifiedReference,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryKey,
    Property,
    Unique,
  } from '@mikro-orm/core';
  import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryKeyUuid } from '../decorators/PrimaryKeyUuid.decorator';
import { Expense } from './expense.entity';
import { Inscription } from './inscription.entity';
import { Pension } from './pension.entity';
import { PensionSalle } from './pensionsalle.entity';
import { AvanceTranche } from './avance-tranche.entity';
import { TrancheStudent } from './tranche-student.entity';
import { Parameter } from './parameter.entity';

@Entity()
@ObjectType()
export class AnneeAccademique {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description!: string;

  // @Field(() => Date, { nullable: true })
  // @Property({ nullable: true })
  // anneeAccademique!: Date | null;

  @OneToMany(()=> Inscription, (inscription) => inscription.anneeAccademique
  )
  inscription = new Collection<Inscription>(this)

  @OneToMany(()=> Pension, (pension) => pension.anneeAccademique
    )
  pension = new Collection<Pension>(this)

  @OneToMany(()=> AvanceTranche, (avanceTranche) => avanceTranche.anneeAcademique
  )
  avanceTranche = new Collection<AvanceTranche>(this)

  @OneToMany(()=> TrancheStudent, (trancheStudent) => trancheStudent.anneeAcademique
  )
  trancheStudent = new Collection<AvanceTranche>(this)

  @OneToMany(()=> Expense, (expense) => expense.anneeAccademique
  )
  expense = new Collection<Expense>(this)

  @OneToMany(()=> PensionSalle, (pensionsalle) => pensionsalle.anneeAccademique
    )
  pensionsalle = new Collection<PensionSalle>(this)

  
  // @OneToMany(()=> Parameter, (parameter) => parameter.anneeAccademique
  //   )
  // parameter = new Collection<Parameter>(this)
}