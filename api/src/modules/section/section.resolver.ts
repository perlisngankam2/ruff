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
import { Periode } from 'src/entities/periode.entity';
import { Prime } from 'src/entities/prime.entity';
import { Section } from 'src/entities/section.entity';
import { SectionCreateInput } from './dto/section.input';
import { SectionUpdateInput } from './dto/section.update';
import { SectionService } from './section.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles';

@Resolver(() => Section)
export class SectionResolver {
  constructor(private readonly sectionService: SectionService) {}

  @Mutation(() => Section)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  createSection(@Args('section') input: SectionCreateInput) {
    return this.sectionService.create(input);
  }

  @Query(() => [Section])
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  findAllsection() {
    return this.sectionService.getAll()
  }

  @Query(() => Section)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  findOnesection(@Args('id', { type: () => String }) id: string) {
    return this.sectionService.findByOne(id);
  }

  @Mutation(()=>Section)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async updatesection(@Args('id') id:string,@Args('input') input:SectionUpdateInput){
    return await this.sectionService.update(id,input)
  }

  @Mutation(()=> Section)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async deletesection(@Args('id') id:string){
 return await this.sectionService.delete(id)
  }

  @Query(() => [Section])
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.FONDATEUR)
  async getAllForUseAnglophone(){
   return await this.sectionService.getAllForUseAnglophone()
  }

  @Query(() => [Section])
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.FONDATEUR)
  async getAllForUseFrancophone(){
   return await this.sectionService.getAllForUseFrancophone()
  }
}
