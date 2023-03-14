/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from "@nestjs/graphql";
// import { CustomTimeType } from "src/entities/course.entity";


@InputType()
export class CourseUpdateInput {

  @Field({nullable:true})
  title:string

  @Field({nullable:true})
  time:string
}