/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class PersonnelSalleUpdateInput {

  @Field(()=>ID,{nullable:true})
  salleId?:string

  @Field(()=>ID,{nullable:true})
  personnelId?:string
}