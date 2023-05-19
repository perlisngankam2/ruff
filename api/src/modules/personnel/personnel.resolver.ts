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
import { Personnel } from 'src/entities/pesonnel.entity';
import { User } from 'src/entities/user.entity';
import { PersonnelCreateInput } from './dto/personnel.input';
import { PersonnelUpdateInput } from './dto/personnel.update';
import { PersonnelService } from './personnel.service';


@Resolver(() => Personnel)
export class PersonnelResolver {
  constructor(private readonly personnelService: PersonnelService) {}

  @Mutation(() => Personnel)
  async createpersonnel(@Args('createPersonnelUser') createPersonnelUserInput: PersonnelCreateInput) {
    return await this.personnelService.createPersonnel(createPersonnelUserInput);
  }

  @Query(() => [Personnel])
  async findAllpersonnel() {
    return await this.personnelService.getAll()
  }
  
  @Query(() => Personnel)
  async findOnePersonnel(@Args('id', { type: () => String }) id: string) {
    return await this.personnelService.findOne(id);
  }

  @Mutation(()=>Personnel)
  async updatepersonnel(@Args('id') id:string,@Args('input') input:PersonnelUpdateInput){
  return await this.personnelService.update(id,input)
  }

  @Mutation(() => Personnel)
  async deletepersonnel(@Args('id') id:string){
   return await this.personnelService.delete(id)
  }

  @Query(()=>User)
  async getpersonnelaccount(@Args('id') id:string){
    return await this.personnelService.getcorrespondingaccount(id)
  }

@Query(()=>Personnel)
  async getpersonnelbyaccount(@Args('userid') userid:string):Promise<Personnel|null>{
    const personnel=await this.personnelService.findpersonnelbyaccount(userid)
    if(!personnel){
     console.log("Il n'existe aucun personnel associee a ce compte")
    }
    return personnel
  }

  @Query(()=>String)
async findCategoriepersonnelbypersonnel(@Args('personnelid') personnelid:string){
     return await this.personnelService.findCategoriepersonnelbypersonnel(personnelid)
  }

}
