/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class ParentStudentCreateInput {

  @Field(()=>ID,{nullable:true})
  studentId?:string

  @Field(()=>ID,{nullable:true})
  parentId?:string
}