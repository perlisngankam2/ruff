/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UserCreateInput } from 'src/modules/user/dto/user.input';

@InputType()
export class PersonnelUpdateInput {
  @Field({nullable:true})
  ID?: string;
  
  @Field({nullable:true})
  situationMatrimonial!: string;

  // @Field(() => ID, { nullable: true })
  // userId?: string;

  @Field({nullable:true})
  sexe?: string;

  @Field({nullable:true})
  fonction?: string;

  @Field({nullable:true})
  matricule?: string;

  @Field({nullable:true})
  childNumber?: string;

  @Field({nullable:true})
  dateOfBirth!: string;

  @Field({ nullable: true })
  dateOfStartWork?: string;

  @Field()
  user?: UserCreateInput
}
