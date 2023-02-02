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
import { Retenue } from 'src/entities/retenu-salaire.entity';
import { RetenuCreateInput } from './dto/retenu.input';
import { RetenuUpdateInput } from './dto/retenu.update';
import { RetenuService } from './retenu.service';


@Resolver(() => Retenue)
export class RetenuResolver {
  constructor(private readonly retenuService: RetenuService) {}

  @Mutation(() => Retenue)
  createretenuesalarial(@Args('retenue') createRetenuInput: RetenuCreateInput) {
    return this.retenuService.create(createRetenuInput);
  }

  @Query(() => [Retenue])
  async findAllretenusalarial() {
    return this.retenuService.getAll()
  }
  
  @Query(() => Retenue, { name: 'prime' })
  findOneretenusalarial(@Args('id', { type: () => String }) id: string) {
    return this.retenuService.findByOne(id);
  }

  @Mutation(()=>Retenue)
  async updateretenusalarial(@Args('id') id:string,@Args('input') input:RetenuUpdateInput){
    return await this.retenuService.update(id,input)
  }

  @Mutation(()=> Retenue)
  async deleteretenusalarial(@Args('id') id:string){
  return await this.retenuService.delete(id)
  }

}
