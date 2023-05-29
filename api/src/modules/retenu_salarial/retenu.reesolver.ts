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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles';


@Resolver(() => Retenue)
export class RetenuResolver {
  constructor(private readonly retenuService: RetenuService) {}

  @Mutation(() => Retenue)
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.PRINCIPAL)
  createretenuesalarial(@Args('retenue') createRetenuInput: RetenuCreateInput) {
    return this.retenuService.create(createRetenuInput);
  }

  @Query(() => [Retenue])
  //  @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.PRINCIPAL)
  async findAllretenusalarial() {
    return this.retenuService.getAll()
  }
  
  @Query(() => Retenue, { name: 'prime' })
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.PRINCIPAL)
  findOneretenusalarial(@Args('id', { type: () => String }) id: string) {
    return this.retenuService.findByOne(id);
  }

  @Mutation(()=>Retenue)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async updateretenusalarial(@Args('id') id:string,@Args('input') input:RetenuUpdateInput){
    return await this.retenuService.update(id,input)
  }

  @Mutation(()=> Retenue)
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.PRINCIPAL)
  async deleteretenusalarial(@Args('id') id:string){
  return await this.retenuService.delete(id)
  }

}
