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
import { Retenue } from './retenu-salaire.entity';
import { Salaire } from './salaire.entity';



@Entity()
@ObjectType()
export class RetenuPersonnel {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  startMonth!: string; 

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();
  
  @ManyToOne(() => Retenue ,{
    nullable:false,
    onDelete:'CASCADE'
  })
  retenue!:IdentifiedReference<Retenue>|null

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

  @Field(() => ID)
  @Property({ persist: false })
  get retenueid() {
    return `${this.retenue.id}`;
  }

  @Field(() => ID)
  @Property({ persist: false })
  get personnelid() {
    return `${this.personnel.id}`;
  }

  @Field(() => ID)
  @Property({ persist: false })
  get salaireid() {
    return `${this.salaire.id}`;
  }

}