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
import { ParentStudent } from './parentStudent.entity';
import { Student } from './student.entity';
import { User } from './user.entity';
  
  
@Entity()
@ObjectType()
export class Parent {
    @Field(() => ID)
    @PrimaryKeyUuid()
    id!: string;

    @Field({ nullable: true })
    @Property({ nullable: true })
    firstname!: string;

    @Field({ nullable: true })
    @Property({ nullable: true })
    lastname!: string;

    @Field({ nullable: true })
    @Property({ nullable: true })
    profession!: string;
    
    @Field({ nullable: true })
    @Property({ nullable: true })
    email!: string;
    
    @Field({ nullable: true })
    @Property({ nullable: true })
    phonenumber!: string;

    @Field({ defaultValue: false })
    @Property({ default: false })
    parent!: boolean;

    @Field({ defaultValue: false })
    @Property({ default: false })
    tuteur!: boolean;

    @Field({ defaultValue: 0 })
    @Property({ default: 0 })
    childNumber!: number;

    //Relation with another table 
    @OneToOne(() => User, (user) => user.parent, {
        owner: true,
        unique: true,
        onDelete: 'CASCADE',
    })
    user!: IdentifiedReference<User>;

    @OneToMany(() => ParentStudent, parentStudent => parentStudent.parent)
    parentStudent = new Collection<ParentStudent>(this);
}