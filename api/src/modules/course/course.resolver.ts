/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Course } from 'src/entities/course.entity';
import { UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseCreateInput } from './dto/course.createinput';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles';
import { CourseUpdateInput } from './dto/course.updateinput';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => Course)
  //   @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.PRINCIPAL)
  createCourse(@Args('input') Input: CourseCreateInput) {
    return this.courseService.create(Input);
  }

  //    @Mutation(() => TrancheStudent)
  //    updateTrancheStudent(@Args('id', { type: () => String }) id: string, Input: TrancheStudentUpdateInput) {
  //      return this.trancheService.update(id,Input);
  //   }

  @Query(() => [Course])
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.PRINCIPAL, Role.FONDATEUR)
  findAllCourse() {
    return this.courseService.findall();
  }
  @Mutation(() => Course)
  async updateCouse(
    @Args('id') id: string,
    @Args('input') input: CourseUpdateInput,
  ) {
    return this.updateCouse(id, input);
  }

  @Query(() => Course)
  // @Roles(Role.PRINCIPAL, Role.FONDATEUR)
  findOneCourse(@Args('id', { type: () => String }) id: string) {
    return this.courseService.findByOne(id);
  }

  @Mutation(() => Course)
  // @Roles(Role.PRINCIPAL)
  async deleteCourse(@Args('id') id: string) {
    return await this.courseService.delete(id);
  }
  
  // @Mutation(() => [Course])
  // // @Roles(Role.PRINCIPAL)
  // async deleteCourse(@Args('ids', { type: () => [String] }) ids: string | string[]) {
  //   if (typeof ids === 'string') {
  //     // Si ids est une chaîne de caractères, on le transforme en tableau avec un seul élément
  //     ids = [ids];
  //   }
  //   return await this.courseService.delete(ids);
  // }

  // async deleteCourses(@Args('ids', { type: () => [String] }) ids: string[]) {
  //   return await Promise.all(ids.map(ids => this.courseService.delete(ids)));
  // }

  @Mutation(() => Course)
  async updatecourse(
    @Args('id') id: string,
    @Args('input') input: CourseUpdateInput,
  ) {
    return await this.updatecourse(id, input);
  }
}
