/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from '@nestjs/common';
import { PersonnelSalle } from "src/entities/personnelsalle.entity";
import { PersonnelSalleCreateInput } from "./dto/personnelsalle.create.input";
import { PersonnelSalleService } from "./personnelsalle.service";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles';

@Resolver(() => PersonnelSalle)
export class PersonnelSalleResolver {
  constructor(private readonly personnelsalleService: PersonnelSalleService) {}

  @Mutation(() => PersonnelSalle)
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.PRINCIPAL)
  createPersonnelSalle(@Args('input') Input: PersonnelSalleCreateInput) {
    return this.personnelsalleService.create(Input);
  }

  @Query(() => [PersonnelSalle])
  findAllPersonnelSalle() {
    return this.personnelsalleService.findall()
  }
  
  @Query(() => PersonnelSalle)
  findOnePersonnelSalle(@Args('id', { type: () => String }) id: string) {
    return this.personnelsalleService.findByOne(id);
  }

  @Query(() => [[String],String,[String]])
  async findbyCoursePersonnelSalle(
      @Args('personnelid', { type: () => String }) personnelid: string,
      @Args('salleid', { type: () => String }) salleid: string,
      @Args('courseid', { type: () => String }) courseid: string) {
    return await this.personnelsalleService.findbyCoursePersonnelSalle(personnelid,salleid,courseid)
  }

  @Mutation(()=> PersonnelSalle)
  async deletePersonnelSalle(@Args('id') id:string){
 return await this.personnelsalleService.delete(id)
  }
}
