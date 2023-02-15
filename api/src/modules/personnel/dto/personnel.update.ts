/* eslint-disable prettier/prettier */
import { DateType } from '@mikro-orm/core';
import { Field, ID, InputType } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/modules/auth/roles/roles';
import { UserCreateInput } from 'src/modules/user/dto/user.input';

@InputType()
export class PersonnelUpdateInput {
  @Field({nullable:true})
  ID?: string;
  
  @Field({nullable:true})
  Matrimonialstatus!: string;

  // @Field(() => ID, { nullable: true })
  // userId?: string;

  @Field({nullable:true})
  sexe?: string;

  @Field({nullable:true})
  fonction?: Role;

  @Field({nullable:true})
  password!:string

  @Field({nullable:true})
  email!:string

  @Field({nullable:true})
  matricule?: string;

  @Field({defaultValue:0})
  childNumber?: number;

  @Field({nullable:true})
  dateOfBirth!: string;

  @Field({ nullable: true })
  dateOfStartWork?: Date;

  @Field()
  user?: UserCreateInput
}
