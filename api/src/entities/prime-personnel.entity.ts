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
import { Personnel } from './pesonnel.entity';
import { Prime } from './prime.entity';
import { Salaire } from './salaire.entity';


@Entity()
@ObjectType()
export class PrimePersonnel {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Field({ nullable: true })
  @Property({ nullable: true })
  startDate!: string; 

  @Field({ nullable: true })
  @Property({ nullable: true })
  endDate!: string; 

  
// relation with another Entites

  @ManyToOne(() => Prime ,{
    nullable:false,
    onDelete:'cascade'
  })
  prime!:IdentifiedReference<Prime>|null

  @ManyToOne(() => Personnel ,{
    nullable:false,
    onDelete:'CASCADE'
  })
  personnel!:IdentifiedReference<Personnel>|null 
  
  @ManyToOne(() => Salaire ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  salaire!:IdentifiedReference<Salaire>|null

}