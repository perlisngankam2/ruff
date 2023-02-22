/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UserCreateInput } from 'src/modules/user/dto/user.input';
import { Role } from 'src/modules/auth/roles/roles';

@InputType()
export class PersonnelCreateInput {
  @Field({nullable:true})
  ID?: string;
  
  @Field({nullable:true})
  firstName?: string; 
  
  @Field({nullable:true})
  lastName?: string;

  @Field({nullable:true})
  situationMatrimonial!: string;

  // @Field(() => ID, { nullable: true })
  // userId?: string;

  @Field({nullable:true})
  sexe?: string;

  @Field({nullable:true})
  phoneNumber?: string;

  @Field({nullable:true})
  fonction?: Role;

  @Field({nullable:true})
  status!: string;
  // @Field({nullable:true})
  // matricule?: string;

  @Field({nullable:true})
  childNumber?: number;

  @Field({nullable:true})
  dateOfBirth!: string;

  @Field({ nullable: true })
  dateOfStartWork?: string;

  @Field()
  user?: UserCreateInput

  @Field({nullable:true})
  password!:string

  @Field({nullable:true})
  email!:string

  @Field(()=>ID, {nullable:true})
  categoryPersonnelId?: string;
}
