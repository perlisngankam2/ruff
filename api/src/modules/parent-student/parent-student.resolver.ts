/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ParentStudentCreateInput } from './dto/parent-student.createinput';
import { ParentStudentUpdateInput } from './dto/parent-student.updateinput';
import { ParentStudent } from 'src/entities/parentStudent.entity';
import { ParentStudentService } from './parent-student.service';

@Resolver(() => ParentStudent)
export class ParentStudentResolver {
  constructor(private readonly parentstudentService: ParentStudentService) {}

  @Mutation(() => ParentStudent)
  async createParentstudent(@Args('input') Input: ParentStudentCreateInput) {
    return await this.parentstudentService.create(Input);
  }

 @Mutation(() => ParentStudent)
 async updateParentstudent(@Args('id', { type: () => String }) id: string, Input: ParentStudentUpdateInput) {
    return await this.parentstudentService.update(id,Input);
  }

  @Query(() => [ParentStudent])
  async findAllparentstudents() {
    return await this.parentstudentService.getAll()
  }
  
  @Query(() => ParentStudent)
  async findOneparentstudent(@Args('id', { type: () => String }) id: string) {
    return await this.parentstudentService.findOne(id);
  }

  @Mutation(()=>ParentStudent)
  async deleteparentstudent(@Args('id') id:string){
  return await this.parentstudentService.delete(id)
  }
}
