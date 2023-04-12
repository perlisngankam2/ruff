/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';


@InputType()
export class TranchePriorityInput {
  @Field(()=>ID,{nullable:true})
  ID!: string;

  @Field({nullable:true})
  name?:string


}
