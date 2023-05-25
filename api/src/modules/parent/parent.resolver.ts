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
import { PrimePersonnel } from 'src/entities/prime-personnel.entity';
import { ParentCreateInput } from './dto/parent.input';
import { Parent } from 'src/entities/parent.entity';
import { ParentService } from './parent.service';
import { ParentUpdateInput } from './dto/parent.update';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles';

@Resolver(() => Parent)
export class ParentResolver {
  constructor(private readonly parentService: ParentService) {}

  @Mutation(() => Parent)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL, Role.ECONOME, Role.FONDATEUR)
  async createParent(@Args('parent') Input: ParentCreateInput) {
    return await this.parentService.create(Input);
  }

 @Mutation(() => Parent)
 @UseGuards(JwtAuthGuard,RolesGuard)
 @Roles(Role.PRINCIPAL, Role.FONDATEUR)
 async updateParent(@Args('id', { type: () => String }) id: string, Input: ParentUpdateInput) {
    return await this.parentService.update(id,Input);
  }

  @Query(() => [Parent])
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL, Role.FONDATEUR)
  async findAllparents() {
    return await this.parentService.getAll()
  }
  
  @Query(() => Parent, { name: 'parent' })
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL, Role.FONDATEUR)
  async findOneparent(@Args('id', { type: () => String }) id: string) {
    return await this.parentService.findOne(id);
  }

  @Mutation(()=>Parent)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL, Role.FONDATEUR)
  async deleteparent(@Args('id') id:string){
  return await this.parentService.delete(id)
  }
}
