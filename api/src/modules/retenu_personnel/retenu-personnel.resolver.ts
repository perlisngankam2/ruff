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
import { RetenuPersonnel } from 'src/entities/retenu-personnel.entity';
import { RetenuPersonnelCreateInput } from './dto/retenu-personnel.input';
import { RetenuPersonnelService } from './retenu-personnel.service';
import { RetenuPersonnelUpdateInput } from './dto/retenu-personnel.update';
import { Retenue } from 'src/entities/retenu-salaire.entity';


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

  @Mutation(()=>RetenuPersonnel)
  async updateretenupersonnel(@Args('id') id:string,@Args('input') input:RetenuPersonnelUpdateInput){
    return await this.retenuPersonnelService.update(id,input)
  }

  @Mutation(()=> RetenuPersonnel)
  async deleteretenupersonnel(@Args('id') id:string){
 return await this.retenuPersonnelService.delete(id)
  }

  @Query(()=> [Number])
  async findmontantretenubypersonnel(@Args('personnelid') personnelid:string){
 return await this.retenuPersonnelService.findmontantretenuebypersonnel(personnelid)
  }

  @Query(()=> [String])
  async findnamesretenubypersonnel(@Args('personnelid') personnelid:string){
 return await this.retenuPersonnelService.findnamesretenuebypersonnel(personnelid)
  }

  @Query(()=> Number)
  async findsumallretenupersonnel(@Args('personnelid') personnelid:string){
 return await this.retenuPersonnelService.getallretenupersonnel(personnelid)
  }

  @Query(()=>[[String],[Number]])
  async getRetenuEtNom(@Args('personnelid') personnelid:string){
 return await this.retenuPersonnelService.NomRetenuEtMontant(personnelid)
  }

  @Query(()=> Number)
  async getallretenupersonnelbymonth(@Args('personnelid') personnelid:string,@Args('month') month:string){
  return await this.retenuPersonnelService.getallretenupersonnelbymonth(personnelid,month)
  }

  @Query(()=> [String])
  async findIdRetenuByRetenuPersonnel(@Args('personnelid') personnelid:string,@Args('month') month:string){
 return await this.retenuPersonnelService.findIdRetenuByRetenuPersonnel(personnelid,month)
  }

  
}
