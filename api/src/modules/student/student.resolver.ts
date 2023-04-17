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
import { Student } from 'src/entities/student.entity';
import { TrancheStudent } from 'src/entities/tranche-student.entity';
import { TrancheStudentService } from '../tranche-student/tranche-student.service';
import { StudentCreateInput } from './dto/student.input';
import { StudentUpdateInput } from './dto/student.update';
import { StudentService } from './student.service';


@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService,
              ) {}

  @Mutation(() => Student)
  createStudent(@Args('student') Input: StudentCreateInput) {
    return this.studentService.create(Input);
  }

  @Mutation(() => Student)
  async updateStudent(
    @Args('id') id:string,
    @Args('input') input: StudentCreateInput,
    ) {
    return this.studentService.update(id,input);
   }

  @Query(() => [Student])
  findAllstudents() {
    return this.studentService.getAll()
  }
  
  @Query(() => Student)
  findOnestudent(@Args('id', { type: () => String }) id: string) {
    return this.studentService.findByOne(id);
  }

  @Mutation(()=> Student)
  async deletestudent(@Args('id') id:string){
    return await this.studentService.delete(id)
  }
  
  @Query(()=>TrancheStudent)
  async getTrancheStudentByStudent(@Args('studentid') studentid:string){
    const TrancheStudent=await this.studentService.findTrancheStudentByStudent(studentid)
    if(!TrancheStudent){
      throw Error("not found")
    }
    return TrancheStudent
  }

  @Query(()=>[Number])
  async AmountrExpectedByTranche(@Args('studentid') studentid:string){
    return await this.studentService.findlisttranche(studentid)
  }

  @Query(()=>Number)
  async getClassfeebyStudent(@Args('studentid') studentid:string){
    return await this.studentService.getclassfeebystudent(studentid)
  }
}
