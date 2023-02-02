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

@Resolver(() => Parent)
export class ParentResolver {
  constructor(private readonly parentService: ParentService) {}

  @Mutation(() => Parent)
  async createParent(@Args('parent') Input: ParentCreateInput) {
    return await this.parentService.create(Input);
  }

 @Mutation(() => Parent)
 async updateParent(@Args('id', { type: () => String }) id: string, Input: ParentUpdateInput) {
    return await this.parentService.update(id,Input);
  }

  @Query(() => [Parent])
  async findAllparents() {
    return await this.parentService.getAll()
  }
  
  @Query(() => Parent, { name: 'parent' })
  async findOneparent(@Args('id', { type: () => String }) id: string) {
    return await this.parentService.findByOne(id);
  }

  @Mutation(()=>Parent)
  async deleteparent(@Args('id') id:string){
  return await this.parentService.delete(id)
  }
}
