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
import { TrancheStudent } from 'src/entities/tranche-student.entity';
import { TrancheStudentCreateInput } from './dto/tranche-student.input';
import { TrancheStudentUpdateInput } from './dto/tranche-student.update';
import { TrancheStudentService } from './tranche-student.service';
import { TrancheStudentPaginatedResponse } from './type/tranchestudentpagination';
import { PaginationInput } from 'src/pagination';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles';


@Resolver(() => TrancheStudent)
export class TrancheStudentResolver {
  constructor(private readonly trancheService: TrancheStudentService) {}

  @Mutation(() => TrancheStudent)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ECONOME)
  createTrancheStudent(@Args('trancheStudent') Input: TrancheStudentCreateInput) {
    return this.trancheService.create(Input);
  }

   @Mutation(() => TrancheStudent)
   @UseGuards(JwtAuthGuard,RolesGuard)
   @Roles(Role.ECONOME)
   updateTrancheStudent(@Args('id', { type: () => String }) id: string, Input: TrancheStudentUpdateInput) {
     return this.trancheService.update(id,Input);
  }

  @Query(() => [TrancheStudent])
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ECONOME)
  findAlltranchestudent() {
    return this.trancheService.getAll()
  }
  
  @Query(() => TrancheStudent, { name: 'trancheStudent' })
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ECONOME)
  findOnetranchestudent(@Args('id', { type: () => String }) id: string) {
    return this.trancheService.findByOne(id);
  }

  @Mutation(()=> TrancheStudent)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ECONOME)
  async deletetranchestudent(@Args('id') id:string){
 return await this.trancheService.delete(id)
  }

//   @Query(()=>Number)
//   async findRecentTrancheStudentAmount(@Args('id') id:string){
//  return await this.trancheService.AmountRecentTranchestudentByStudent(id)
//   }

  @Query(()=>TrancheStudent)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ECONOME)
  async getStudentByTrancheStudent(@Args('studentid') studentid:string){
    const student=await this.trancheService.findStudentByTrancheStudent(studentid)
    if(!student){
      throw Error("not found")
    }
    return student
  }

  @Query(() => TrancheStudentPaginatedResponse)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ECONOME)
  async pagiantionResponseTrancheStudent(
    @Args('pagination') pagination: PaginationInput,
  ): Promise<TrancheStudentPaginatedResponse> {
    return await this.trancheService.pagiantionResponseTrancheStudent(pagination);
  }

  @Query(()=>Date)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ECONOME)
  async getTranchestudentPaymentDate(@Args('studentid') studentid:string,@Args('trancheid') trancheid:string){
    return await this.trancheService.getTranchestudentPaymentDate(studentid,trancheid)
  }

  @Query(()=>Date)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ECONOME)
  async getTrancheDateLineByStudent(@Args('studentid') studentid:string,@Args('trancheid') trancheid:string){
  return await this.trancheService.getTrancheDateLineByStudent(studentid,trancheid)
  }

}
