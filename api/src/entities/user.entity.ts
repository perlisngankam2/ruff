/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
    Entity,
    Enum,
    Filter,
    IdentifiedReference,
    ManyToOne,
    OneToOne,
    PrimaryKey,
    Property,
    Unique,
  } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '../modules/auth/roles/roles';
import { PrimaryKeyUuid } from '../decorators/PrimaryKeyUuid.decorator';
import { Parent } from './parent.entity';
import { Personnel } from './pesonnel.entity';
import { Student } from './student.entity';

@Entity()
@ObjectType()
export class User {
  @Field(()=>ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  email!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  password!: string;
  
  @Field({ nullable: true })
  @Property({ nullable: true })
  firstName!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  lastName!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  name!: string;

  @Field(() => Role,{nullable: true })
  @Enum({items: () => Role, nullable:true})
  role!: Role;
  
  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  phoneNumber!: string | null;

  @Field(()=> Boolean,{ nullable: true })
  @Property({ nullable: true })
  active: boolean = true;

  @Property({ nullable: true })
  @Field(() => Date, { nullable: true })
  lastConnection!: Date | null;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => Date, { nullable: true })
  @Property({ nullable: true })
  deactivatedAt!: Date | null;

  //relatio with another entities 
  @OneToOne(() => Personnel, (personnel) => personnel.user, {
    owner: false,
    nullable: true,
  })
  personnel!: IdentifiedReference<Personnel> | null;

  // @OneToOne(() => Parent, (parent) => parent.user, {
  //   owner: false,
  //   nullable: true,
  // })
  // parent!: IdentifiedReference<Parent> | null;

  @OneToOne(() => Student, (student) => student.user, {
    owner: false,
    nullable: true,
  })
  student!: IdentifiedReference<Student> | null;

  @Field(() => ID, { nullable: true })
  @Property({ persist: false })
  get personnelid(): string | null {
    return this.personnel? `${this.personnel.id}` : null;
  }
  

  @Field(() => ID,{ nullable: true })
  @Property({ persist: false })
  get studentid(): string | null {
    return this.student? `${this.student.id}`:null;
  }
}

