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
import { Parent } from './parent.entity';
import { Student } from './student.entity';
import { User } from './user.entity';
  
  
@Entity()
@ObjectType()
export class ParentStudent {
    @Field(() => ID)
    @PrimaryKeyUuid()
    id!: string;

    @Field({ defaultValue: false })
    @Property({ default: false })
    tuteur!: boolean;

    @Field({ defaultValue: 0 })
    @Property({ default: 0 })
    childNumber!: number;

    //Relation with another table 

    @ManyToOne(() => Parent ,{
        nullable:false,
        onDelete:'CASCADE'
      })
    parent!:IdentifiedReference<Parent>|null

    @ManyToOne(() => Student ,{
        nullable:false,
        onDelete:'CASCADE'
      })
    student!:IdentifiedReference<Student>|null
}