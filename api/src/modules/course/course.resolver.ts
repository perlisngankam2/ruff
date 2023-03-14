/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Course } from "src/entities/course.entity";
import { CourseService } from "./course.service";
import { CourseCreateInput } from "./dto/course.createinput";


@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => Course)
  createPersonnelSalle(@Args('input') Input: CourseCreateInput) {
    return this.courseService.create(Input);
  }

//    @Mutation(() => TrancheStudent)
//    updateTrancheStudent(@Args('id', { type: () => String }) id: string, Input: TrancheStudentUpdateInput) {
//      return this.trancheService.update(id,Input);
//   }

  @Query(() => [Course])
  findAllPersonnelSalle() {
    return this.courseService.findall()
  }
  
  @Query(() => Course)
  findOnePersonnelSalle(@Args('id', { type: () => String }) id: string) {
    return this.courseService.findByOne(id);
  }

  @Mutation(()=> Course)
  async deletePersonnelSalle(@Args('id') id:string){
 return await this.courseService.delete(id)
  }
}
