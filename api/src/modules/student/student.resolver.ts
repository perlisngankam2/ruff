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
import { Tranche } from 'src/entities/tranche.entity';
import { PaginationInput } from 'src/pagination';
import { StudentPaginatedResponse } from './type/studentpagination';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/roles/roles';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService,
              ) {}

  @Mutation(() => Student)
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.ECONOME, Role.PRINCIPAL)
  createStudent(@Args('student') Input: StudentCreateInput) {
    return this.studentService.create(Input);
  }

  @Mutation(() => Student)
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.ECONOME)
  async updateStudent(
    @Args('id') id:string,
    @Args('input') input: StudentCreateInput,
    ) {
    return this.studentService.update(id,input);
  }

   @Query(() => StudentPaginatedResponse)
   async pagiantionResponseStudent(
     @Args('pagination') pagination: PaginationInput,
   ): Promise<StudentPaginatedResponse> {
     return await this.studentService.pagiantionResponseStudent(pagination);
   }

  @Query(() => [Student])
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.ECONOME, Role.PRINCIPAL)
  findAllstudents() {
    return this.studentService.getAll()
  }
  
  @Query(() => Student)
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.ECONOME, Role.PRINCIPAL)
  findOnestudent(@Args('id', { type: () => String }) id: string) {
    return this.studentService.findByOne(id);
  }

  @Mutation(()=> Student)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ECONOME)
  async deletestudent(@Args('id') id:string){
    return await this.studentService.delete(id)
  }
  
  // @Query(()=>TrancheStudent)
  // async getTrancheStudentByStudent(@Args('studentid') studentid:string){
  //   const TrancheStudent=await this.studentService.findTrancheStudentByStudent(studentid)
  //   if(!TrancheStudent){
  //     throw Error("not found")
  //   }
  //   return TrancheStudent
  // }

  @Query(()=>[Student])
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.FONDATEUR)
  async getAllStudentsForUseAnglophone(){
    return await this.studentService.getAllForUseAnglophone()
  }
  
  @Query(()=>[Number])
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ECONOME)
  async AmountrExpectedByTranche(@Args('studentid') studentid:string){
    return await this.studentService.findlisttranche(studentid)
  }

  @Query(()=>Number)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ECONOME, Role.ADMIN)
  async getClassfeebyStudent(@Args('studentid') studentid:string){
    return await this.studentService.getclassfeebystudent(studentid)
  }

  @Query(()=>[Tranche])
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ECONOME)
  async getClassfeeofStudent(@Args('studentid') studentid:string){
    return await this.studentService.findlistfees(studentid)
  }

@Query(()=>[Student])
@UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.FONDATEUR)
  async getAllForUseAnglophoneStudent(){
    return await this.studentService.getAllForUseAnglophone()
  }

}
