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
import { PrimeCreateInput } from './dto/prime.input';
import { PrimeUpdateInput } from './dto/prime.update';
import { PrimeService } from './prime.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles';


@Resolver(() => Prime)
export class PrimeResolver {
  constructor(private readonly primeService: PrimeService) {}

  @Mutation(() => Prime)
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.PRINCIPAL)
  createprime(@Args('prime') createPrimeInput: PrimeCreateInput) {
    return this.primeService.create(createPrimeInput);
  }

  @Query(() => [Prime])
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.PRINCIPAL)
  findAllprime() {
    return this.primeService.getAll()
  }
  
  @Query(() => Prime, { name: 'prime' })
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.PRINCIPAL)
  findOnePrime(@Args('id', { type: () => String }) id: string) {
    return this.primeService.findByOne(id);
  }

  @Mutation(()=>Prime)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async updateprime(@Args('id') id:string,@Args('input') input:PrimeUpdateInput){
  return await this.primeService.update(id,input)
  }

  @Mutation(()=>Prime)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async deleteprime(@Args('id') id:string){
    return await this.primeService.delete(id)
  }

}
