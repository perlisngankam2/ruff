/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { SectionCycleCreateInput } from 'src/modules/section-cycle/dto/section-cycle.input';
import { UserCreateInput } from 'src/modules/user/dto/user.input';

@InputType()
export class ParentCreateInput {
 
  @Field({nullable:true})
  ID?: string;
  
  @Field({nullable:true})
  firstname?: string;

  @Field({nullable:true})
  lastname?: string;

  @Field({nullable:true})
  profession?: string;

  @Field({nullable:true})
  phonenumber?: string;

  @Field({nullable:true})
  email?: string;

  @Field({defaultValue:false})
  tuteur?: boolean;

  @Field({defaultValue:false})
  parent?: boolean;

  @Field({defaultValue:0})
  childNumber?: number;

  @Field({nullable:true})
  user:UserCreateInput
}