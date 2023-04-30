/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ParameterCreateInput {
 
  @Field({nullable:true})
  ID?: string;
  
  @Field({nullable:true})
  year?: string;
}