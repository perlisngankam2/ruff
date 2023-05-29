/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Course } from "src/entities/course.entity";
import { CourseService } from "./course.service";
import { CourseCreateInput } from "./dto/course.createinput";
import { CourseUpdateInput } from "./dto/course.updateinput";


@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => Course)
  createCourse(@Args('input') Input: CourseCreateInput) {
    return this.courseService.create(Input);
  }

//    @Mutation(() => TrancheStudent)
//    updateTrancheStudent(@Args('id', { type: () => String }) id: string, Input: TrancheStudentUpdateInput) {
//      return this.trancheService.update(id,Input);
//   }

  @Query(() => [Course])
  findAllCourse() {
    return this.courseService.findall()
  }
  
  @Query(() => Course)
  findOneCourse(@Args('id', { type: () => String }) id: string) {
    return this.courseService.findByOne(id);
  }

  @Mutation(()=> Course)
  async deleteCourse(@Args('id') id:string){
 return await this.courseService.delete(id)
  }

  @Mutation(()=> Course)
  async updatecourse(@Args('id') id:string, @Args('input') input:CourseUpdateInput){
  return await this.updatecourse(id,input)
  }
}
