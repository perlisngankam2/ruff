/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class TranchePriorityUpdateInput {
  @Field(()=>ID,{nullable:true})
  name?:string

}
