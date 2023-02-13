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
import { ReductionScolarite } from './reduction-scolarite.entity';

@Entity()
@ObjectType()
export class CategorieEleve {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  nom!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description!: string;

//   relation with another Entites
  @ManyToOne(() => ReductionScolarite ,{
    nullable:false,
    onDelete:'CASCADE'
  })
  reductionScolarite!:IdentifiedReference<ReductionScolarite>|null

}