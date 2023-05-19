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
import { Prime } from 'src/entities/prime.entity';
import { PrimeCreateInput } from './dto/prime.input';
import { PrimeUpdateInput } from './dto/prime.update';
import { PrimeService } from './prime.service';


@Resolver(() => Prime)
export class PrimeResolver {
  constructor(private readonly primeService: PrimeService) {}

  @Mutation(() => Prime)
  createprime(@Args('prime') createPrimeInput: PrimeCreateInput) {
    return this.primeService.create(createPrimeInput);
  }

  @Query(() => [Prime])
  findAllprime() {
    return this.primeService.getAll()
  }
  
  @Query(() => Prime)
  async findOnePrime(@Args('id', { type: () => String }) id: string) {
    return this.primeService.findByOne(id);
  }

  @Mutation(()=>Prime)
  async updateprime(@Args('id') id:string,@Args('input') input:PrimeUpdateInput){
  return await this.primeService.update(id,input)
  }

  @Mutation(()=>Prime)
  async deleteprime(@Args('id') id:string){
    return await this.primeService.delete(id)
  }

}
