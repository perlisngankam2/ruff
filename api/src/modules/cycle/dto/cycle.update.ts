/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CycleUpdateInput {
  @Field(()=>ID,{nullable:true})
  ID?: string;

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;

  @Field({nullable:true,defaultValue:0})
  effectif?: number; 
}
