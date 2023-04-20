/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { Role } from 'src/modules/auth/roles/roles';

@InputType()
export class UserCreateInput {
  @Field({nullable:true})
  ID!: string;

  @Field({nullable:true})
  email!: string;

  @Field({nullable:true})
  password!: string;

  @Field({nullable:true})
  firstName!: string;

  @Field({nullable:true})
  lastName!: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;



  @Field(() => Role,{nullable: true})
  role!: Role

}
