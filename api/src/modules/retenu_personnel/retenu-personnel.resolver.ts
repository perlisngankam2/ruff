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
import { PrimePersonnel } from 'src/entities/prime-personnel.entity';
import { RetenuPersonnel } from 'src/entities/retenu-personnel.entity';
import { RetenuPersonnelCreateInput } from './dto/retenu-personnel.input';
import { RetenuPersonnelUpdateInput } from './dto/retenu-personnel.update';
import { RetenuPersonnelService } from './retenu-personnel.service';


@Resolver(() => RetenuPersonnel)
export class RetenuPersonnelResolver {
  constructor(private readonly retenuPersonnelService: RetenuPersonnelService) {}

  @Mutation(() => RetenuPersonnel)
  async createretnupersonnel(@Args('retenuPersonnel') createRetenuPersonnelInput: RetenuPersonnelCreateInput) {
    return await this.retenuPersonnelService.create(createRetenuPersonnelInput);
  }

  @Query(() => [RetenuPersonnel])
  async findAllretenupersonnel() {
    return await this.retenuPersonnelService.getAll()
  }
  
  @Query(() => RetenuPersonnel, { name: 'retenuPersonnel' })
  async findOneretenupersonnel(@Args('id', { type: () => String }) id: string) {
    return await this.retenuPersonnelService.findByOne(id);
  }

  // @Mutation(()=>RetenuPersonnel)
  // async updateretenupersonnel(@Args('id') id:string,@Args('input') input:RetenuPersonnelUpdateInput){
  //   return await this.retenuPersonnelService.update(id,input)
  // }

  @Mutation(()=> RetenuPersonnel)
  async deleteretenupersonnel(@Args('id') id:string){
 return await this.retenuPersonnelService.delete(id)
  }

  @Query(()=> [RetenuPersonnel])
  async findretenupersonnelbypersonnel(@Args('personnelid') personnelid:string){
 return await this.retenuPersonnelService.findbypersonnel(personnelid)
  }

  @Query(()=> Number)
  async findallretenupersonnel(@Args('personnelid') personnelid:string){
 return await this.retenuPersonnelService.getallretenupersonnel(personnelid)
  }

}
