/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { Role } from '../../../modules/auth/roles/roles';

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

  @Field(() => Role,{nullable: true})
  role!: Role

  @Field({nullable:true})
  name!: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

}
