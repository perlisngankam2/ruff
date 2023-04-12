/* eslint-disable prettier/prettier */
import { Field,  ID,  InputType } from '@nestjs/graphql';

@InputType()
export class TranchePriorityUpdateInput {
  @Field(()=>ID,{nullable:true})
  ID!: string;

  @Field({nullable:true})
  name?:string

}
