/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Cycle } from 'src/entities/cycle.entity';
import { Periode } from 'src/entities/periode.entity';
import { Prime } from 'src/entities/prime.entity';
import { Section } from 'src/entities/section.entity';
import { SectionCreateInput } from '../section/dto/section.input';
import { CycleService } from './cycle.service';
import { CycleCreateInput } from './dto/cycle.input';
import { CycleUpdateInput } from './dto/cycle.update';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles';

@Resolver(() => Cycle)
export class CycleResolver {
  constructor(private readonly cycleService: CycleService) {}

  @Mutation(() => Cycle)
    @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async createCycle(@Args('cycle') input:CycleCreateInput) {
    return await this.cycleService.create(input);
  }
  @Query(() => [Cycle])
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async findAllcycle() {
    return await this.cycleService.getAll()
  }
  
  @Query(() => Cycle)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async findOnecycle(@Args('id', { type: () => String }) id: string) {
    return await this.cycleService.findById(id);
  }

  @Mutation(()=>Cycle)
  async updatecycle(@Args('id') id:string,@Args('input') input:CycleUpdateInput){
  return await this.cycleService.update(id,input)
  }

  @Mutation(() => Cycle)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async deletecycle(@Args('id') id:string){
  return await this.cycleService.delete(id)
  }
}
