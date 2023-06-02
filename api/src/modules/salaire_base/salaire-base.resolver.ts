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
import { SalaireBase } from '../../entities/salaire-base.entity';
import { SalaireBaseCreateInput } from './dto/salaire-base.input';
import { SalaireBaseUpdateInput } from './dto/salaire-base.update';
import { SalaireBaseService } from './salaire-base.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles';

@Resolver(() => SalaireBase)
export class SalaireBaseResolver {
  constructor(private readonly salaireBaseService: SalaireBaseService) {}

  @Mutation(() => SalaireBase)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ECONOME)
  createsalairebase(
    @Args('salaireBase') salaireCreateInput: SalaireBaseCreateInput,
  ) {
    return this.salaireBaseService.create(salaireCreateInput);
  }

  @Query(() => [SalaireBase])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ECONOME)
  findAllsalaire() {
    return this.salaireBaseService.getAll();
  }

  @Query(() => SalaireBase, { name: 'salaireBase' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ECONOME)
  findOnesalaire(@Args('id', { type: () => String }) id: string) {
    return this.salaireBaseService.findByOne(id);
  }

  @Mutation(() => SalaireBase)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ECONOME)
  async updatesalairebase(
    @Args('id') id: string,
    @Args('input') input: SalaireBaseUpdateInput,
  ) {
    return await this.salaireBaseService.update(id, input);
  }

  @Mutation(() => SalaireBase)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ECONOME)
  async deletesalairebase(@Args('id') id: string) {
    return await this.salaireBaseService.delete(id);
  }
}
