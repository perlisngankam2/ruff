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
import { Tranche } from 'src/entities/tranche.entity';
import { TrancheCreateInput } from './dto/tranche.input';
import { TrancheUpdateInput } from './dto/tranche.update';
import { TrancheService } from './tranche.service';
import { TrancheStat } from '../statistics/classStatistics';


@Resolver(() => Tranche)
export class TrancheResolver {
  constructor(private readonly trancheService: TrancheService) {}

  @Mutation(() => Tranche)
  createTranche(@Args('tranche') Input: TrancheCreateInput) {
    return this.trancheService.create(Input);
  }

 @Mutation(() => Tranche)
  updatetranche(@Args('id', { type: () => String }) id: string, Input: TrancheUpdateInput) {
   return this.trancheService.update(id,Input);
  }

  @Query(() => [Tranche])
  findAlltranche() {
    return this.trancheService.getAll()
  }
  
  @Query(() => Tranche, { name: 'tranche' })
  findOnetranche(@Args('id', { type: () => String }) id: string) {
    return this.trancheService.findByOne(id);
  }

  @Mutation(()=> Tranche)
  async deleteprimepersonnel(@Args('id') id:string){
 return await this.trancheService.delete(id)
  }

  @Query(()=>[TrancheStat])
  async findByStudentRestTranche(@Args('studentid') studentid:string){
   return await this.trancheService.findByStudentRestTranche(studentid)
  }
}
