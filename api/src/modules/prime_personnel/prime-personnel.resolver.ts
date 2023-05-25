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
import { Prime } from 'src/entities/prime.entity';
import { PrimePersonnelCreateInput } from './dto/prime-personnel.input';
import { PrimePersonnelUpdateInput } from './dto/prime-personnel.update';
import { PrimePersonnelService } from './prime-personnel.service';
// import {prime}
import e from 'express';
import { PaginationInput } from 'src/pagination';
import { PrimePersonnelPaginatedResponse } from './type/primepersonnelpagination';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles';

@Resolver(() => PrimePersonnel)
export class PrimePersonnelResolver {
  constructor(private readonly primePersonnelService: PrimePersonnelService) {}

  @Mutation(() => PrimePersonnel)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async createprimepersonnel(@Args('primePersonnel') createPrimePersonnelInput: PrimePersonnelCreateInput) {
    return await this.primePersonnelService.create(createPrimePersonnelInput);
  }

  @Query(() => [PrimePersonnel])
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async findAllprimepersonnel() {
    return await this.primePersonnelService.getAll()
  }
  
  @Query(() => PrimePersonnel, { name: 'primePersonnel' })
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async findOnePrimepersonnel(@Args('id', { type: () => String }) id: string) {
    return await this.primePersonnelService.findByOne(id);
  }

  // @Mutation(()=>PrimePersonnel)
  // async updateprimepersonnel(@Args('id') id:string,@Args('input') input:PrimePersonnelUpdateInput){
  //   return await this.primePersonnelService.update(id,input)
  // }

  @Mutation(()=> PrimePersonnel)
  async deleteprimepersonnel(@Args('id') id:string){
 return await this.primePersonnelService.delete(id)
  }

  @Query(()=> [Number])
  async findmontantprimebypersonnel(@Args('personnelid') personnelid:string){
 return await this.primePersonnelService.findmontantprimesbypersonnel(personnelid)
  }

  
  @Query(()=> [String])
  async findnamesprimebypersonnel(@Args('personnelid') personnelid:string){
 return await this.primePersonnelService.findnamesprimesbypersonnel(personnelid)
  }

  @Query(()=> [String])
  async findIdPrimeByPersonnel(@Args('personnelid') personnelid:string){
 return await this.primePersonnelService.findIdPrimeByPersonnel(personnelid)
  }
  @Query(()=> Number)
  async findsumallprimepersonnel(@Args('personnelid') personnelid:string){
 return await this.primePersonnelService.getallpersonnelprime(personnelid)
  }

  @Query(()=> [[String],[Number]] )
  async primesETnomprimepersonnel(@Args('personnelid') personnelid:string){
 return await this.primePersonnelService.primesETnomprimepersonnel(personnelid)
  }

  @Query(()=> [Prime])
  async findPrimesByPrimesPersonnel(@Args('personnelid') personnelid:string,@Args('month') month:string){
 return await this.primePersonnelService.findPrimesByPrimesPersonnel(personnelid,month)
  }

  @Query(()=> Number)
  async getallpersonnelprimebymont(@Args('personnelid') personnelid:string,@Args('month') month:string){
  return await this.primePersonnelService.getallpersonnelprimebymonth(personnelid,month)
  }

  @Query(()=>[Prime])
  async allMonthAffectedPrimeToPersonnel(@Args('personnelid') personnelid:string,@Args('primeid') primeid:string){
  return await this.primePersonnelService.allMonthAffectedPrimeToPersonnel(personnelid,primeid)
  }
  
  
  @Query(() => PrimePersonnelPaginatedResponse)
  async pagiantionResponsePrimePersonnel(
  @Args('pagination') pagination: PaginationInput,
): Promise<PrimePersonnelPaginatedResponse> {
  return await this.primePersonnelService.paginationResponsePrimePersonnel(pagination);
}

}
