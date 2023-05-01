/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ParameterUpdateInput {
 
  @Field({nullable:true})
  ID?: string;
  
  @Field({nullable:true})
  year?: string;
}