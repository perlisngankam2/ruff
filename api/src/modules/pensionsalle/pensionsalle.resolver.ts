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
import { Pension } from 'src/entities/pension.entity';
import { PensionSalleService } from './pensionsalle.service';
import { PensionSalleCreateInput } from './dto/pensionsalle.input';
import { PensionSalle } from 'src/entities/pensionsalle.entity';
import { PensionSalleUpdateInput } from './dto/pensionsalle.update';



@Resolver(() => PensionSalle)
export class PensionSalleResolver {
  constructor(private readonly pensionsalleService: PensionSalleService) {}

  @Mutation(() => PensionSalle)
  async createPensionSalle(@Args('pensionsalle') Input: PensionSalleCreateInput) {
    return await this.pensionsalleService.create(Input);
  }

   @Mutation(() => PensionSalle)
   async updatePension(@Args('id', { type: () => String }) id: string, Input: PensionSalleUpdateInput) {
     return await this.pensionsalleService.update(id,Input);
  }

  @Query(() => [PensionSalle])
  async findAllpensionSalle() {
    return await this.pensionsalleService.getAll()
  }
  
  @Query(() => PensionSalle)
  async findOnepensionsalle(@Args('id', { type: () => String }) id: string) {
    return  await this.pensionsalleService.findByOne(id);
  }

  @Mutation(()=>PensionSalle)
  async deletepension(@Args('id') id:string){
  return await this.pensionsalleService.delete(id)
  }
}
