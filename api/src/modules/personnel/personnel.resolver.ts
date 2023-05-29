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
import { PersonnelPaginatedResponse } from './type/personnelpagination';
import { PaginationInput } from 'src/pagination';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles';


@Resolver(() => Personnel)
export class PersonnelResolver {
  constructor(private readonly personnelService: PersonnelService) {}

  @Mutation(() => Personnel)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ADMIN)
  async createpersonnel(@Args('createPersonnelUser') createPersonnelUserInput: PersonnelCreateInput) {
    return await this.personnelService.createPersonnel(createPersonnelUserInput);
  }

 
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ADMIN)
  @Query(() => [Personnel])
  async findAllpersonnel() {
    return await this.personnelService.getAll()
  }

  
  @Query(() => PersonnelPaginatedResponse)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ADMIN)
  async pagiantionResponsePersonnel(
  @Args('pagination') pagination: PaginationInput,
): Promise<PersonnelPaginatedResponse> {
  return await this.personnelService.paginationResponsePersonnel(pagination);
}
  
  @Query(() => Personnel)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ADMIN)
  async findOnePersonnel(@Args('id', { type: () => String }) id: string) {
    return await this.personnelService.findOne(id);
  }

  @Mutation(()=>Personnel)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ADMIN)
  async updatepersonnel(@Args('id') id:string,@Args('input') input:PersonnelUpdateInput){
  return await this.personnelService.update(id,input)
  }

  @Mutation(() => Personnel)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ADMIN)
  async deletepersonnel(@Args('id') id:string){
   return await this.personnelService.delete(id)
  }

  @Query(()=>User)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ADMIN)
  async getpersonnelaccount(@Args('id') id:string){
    return await this.personnelService.getcorrespondingaccount(id)
  }

@Query(()=>Personnel)
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ADMIN)
async getpersonnelbyaccount(@Args('userid') userid:string):Promise<Personnel|null>{
    const personnel=await this.personnelService.findpersonnelbyaccount(userid)
    if(!personnel){
      throw Error("not found")
    }
    return personnel
  }

  @Query(()=>String)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ADMIN)
  async findCategoriepersonnelbypersonnel(@Args('personnelid') personnelid:string){
     return await this.personnelService.findCategoriepersonnelbypersonnel(personnelid)
  }

}
