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
import { PensionCreateInput } from './dto/pension.input';
import { PensionUpdateInput } from './dto/pension.update';
import { PensionService } from './pension.service';


@Resolver(() => Pension)
export class PensionResolver {
  constructor(private readonly pensionService: PensionService) {}

  @Mutation(() => Pension)
  async createPension(@Args('pension') Input: PensionCreateInput) {
    return await this.pensionService.create(Input);
  }

  //  @Mutation(() => Pension)
  //  async updatePension(@Args('id', { type: () => String }) id: string, Input: PensionUpdateInput) {
  //    return await this.pensionService.update(id,Input);
  // }

  @Query(() => [Pension])
  async findAllpension() {
    return await this.pensionService.getAll()
  }
  
  @Query(() => Pension, { name: 'pension' })
  async findOnepension(@Args('id', { type: () => String }) id: string) {
    return  await this.pensionService.findByOne(id);
  }

  @Mutation(()=>Pension)
  async deletepension(@Args('id') id:string){
  return await this.pensionService.delete(id)
  }
}
