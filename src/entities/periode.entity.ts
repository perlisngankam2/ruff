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
import { Salaire } from './salaire.entity';


@Entity()
@ObjectType()
export class Periode {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  nom!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  datePeriode!: Date ;

// relation with another Entites
  @OneToMany(() => Salaire, salaire => salaire.periode)
  salaire = new Collection<Salaire>(this);

}