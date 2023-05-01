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
import { Parent } from 'src/entities/parent.entity';
import { Parameter } from 'src/entities/parameter.entity';
import { ParameterService } from './parameter.service';
import { ParameterCreateInput } from './dto/parameter.input';
import { ParameterUpdateInput } from './dto/parameter.update';

@Resolver(() => Parameter)
export class ParameterResolver {
  constructor(private readonly parameterService: ParameterService) {}

  @Mutation(() => Parameter)
  async createParameter(@Args('input') Input: ParameterCreateInput) {
    return await this.parameterService.create(Input);
  }

 @Mutation(() => Parameter)
 async updateParameter(@Args('id', { type: () => String }) id: string, Input: ParameterUpdateInput) {
    return await this.parameterService.update(id,Input);
  }

  @Query(() => [Parameter])
  async findAllparameters() {
    return await this.parameterService.getAll()
  }
  
  @Query(() => Parameter)
  async findOneparameters(@Args('id', { type: () => String }) id: string) {
    return await this.parameterService.findOne(id);
  }

  @Mutation(()=>Parameter)
  async deleteparamaters(@Args('id') id:string){
  return await this.parameterService.delete(id)
  }
}
