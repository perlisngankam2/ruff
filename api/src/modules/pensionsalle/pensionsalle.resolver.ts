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
import { Pension } from 'src/entities/pension.entity';
import { PensionSalleService } from './pensionsalle.service';
import { PensionSalleCreateInput } from './dto/pensionsalle.input';
import { PensionSalle } from 'src/entities/pensionsalle.entity';
import { PensionSalleUpdateInput } from './dto/pensionsalle.update';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles';


@Resolver(() => PensionSalle)
export class PensionSalleResolver {
  constructor(private readonly pensionsalleService: PensionSalleService) {}

  @Mutation(() => PensionSalle)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async createPensionSalle(@Args('pensionsalle') Input: PensionSalleCreateInput) {
    return await this.pensionsalleService.create(Input);
  }

   @Mutation(() => PensionSalle)
   async updatePension(@Args('id', { type: () => String }) id: string, Input: PensionSalleUpdateInput) {
     return await this.pensionsalleService.update(id,Input);
  }

  @Query(() => [PensionSalle])
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL, Role.FONDATEUR)
  async findAllpensionSalle() {
    return await this.pensionsalleService.getAll()
  }
  
  @Query(() => PensionSalle)
  async findOnepensionsalle(@Args('id', { type: () => String }) id: string) {
    return  await this.pensionsalleService.findByOne(id);
  }

  @Mutation(()=>PensionSalle)
  async deletepension(@Args('id') id:string){
  return await this.pensionsalleService.delete(id)
  }
}
