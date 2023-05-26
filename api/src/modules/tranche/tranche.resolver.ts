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
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { Role } from "../auth/roles/roles";


@Resolver(() => Tranche)
export class TrancheResolver {
  constructor(private readonly trancheService: TrancheService) {}

  @Mutation(() => Tranche)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ECONOME)
  createTranche(@Args('tranche') Input: TrancheCreateInput) {
    return this.trancheService.create(Input);
  }

 @Mutation(() => Tranche)
 @Roles(Role.ECONOME, Role.PRINCIPAL)
  updatetranche(@Args('id', { type: () => String }) id: string, Input: TrancheUpdateInput) {
   return this.trancheService.update(id,Input);
  }

  @Query(() => [Tranche])
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ECONOME, Role.PRINCIPAL)
  findAlltranche() {
    return this.trancheService.getAll()
  }
  
  @Query(() => Tranche, { name: 'tranche' })
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ECONOME, Role.PRINCIPAL)
  findOnetranche(@Args('id', { type: () => String }) id: string) {
    return this.trancheService.findByOne(id);
  }

  @Mutation(()=> Tranche)
  async deleteprimepersonnel(@Args('id') id:string){
 return await this.trancheService.delete(id)
  }

  @Mutation(()=> Tranche)
  async deletestudent(@Args('id') id:string){
    return await this.trancheService.delete(id)
  }


  @Query(()=>[TrancheStat])
  @Roles(Role.ECONOME, Role.PRINCIPAL)
  async findByStudentRestTranche(@Args('studentid') studentid:string){
   return await this.trancheService.findByStudentRestTranche(studentid)
  }
}
