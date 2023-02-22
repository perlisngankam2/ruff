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


@Resolver(() => TrancheStudent)
export class TrancheStudentResolver {
  constructor(private readonly trancheService: TrancheStudentService) {}

  @Mutation(() => TrancheStudent)
  createTrancheStudent(@Args('trancheStudent') Input: TrancheStudentCreateInput) {
    return this.trancheService.create(Input);
  }

   @Mutation(() => TrancheStudent)
   updateTrancheStudent(@Args('id', { type: () => String }) id: string, Input: TrancheStudentUpdateInput) {
     return this.trancheService.update(id,Input);
  }

  @Query(() => [TrancheStudent])
  findAlltranchestudent() {
    return this.trancheService.getAll()
  }
  
  @Query(() => TrancheStudent, { name: 'trancheStudent' })
  findOnetranchestudent(@Args('id', { type: () => String }) id: string) {
    return this.trancheService.findByOne(id);
  }

  @Mutation(()=> TrancheStudent)
  async deletetranchestudent(@Args('id') id:string){
 return await this.trancheService.delete(id)
  }
}
