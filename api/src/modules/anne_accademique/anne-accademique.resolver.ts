/* eslint-disable prettier/prettier */

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
import { AnneeAccademique } from '../../entities/annee-accademique.entity';
import { AnneeAccademiqueService } from './anne-accademique.service';
import { AnneeAccademiqueCreateInput } from './dto/anne-accademique.update';
import { AnneeAccademiqueUpdateInput } from './dto/anne-accadmique.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles';

@Resolver(() => AnneeAccademique)
export class AnneeAccademiqueResolver {
  constructor(private readonly anneeService: AnneeAccademiqueService) {}

  @Mutation(() => AnneeAccademique)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  async createAnnerAccademique(
    @Args('anneeAccademique') input: AnneeAccademiqueCreateInput,
  ) {
    return await this.anneeService.create(input);
  }

  @Query(() => [AnneeAccademique])
  async findAllAnnerAccademique() {
    return await this.anneeService.getAll();
  }

  @Query(() => AnneeAccademique, { name: 'anneeAccademique' })
  async findOneAnnerAccademique(
    @Args('id', { type: () => String }) id: string,
  ) {
    return await this.anneeService.findById(id);
  }

  @Mutation(() => AnneeAccademique)
  async updateanneeacademique(
    @Args('id') id: string,
    @Args('input') updateinput: AnneeAccademiqueUpdateInput,
  ) {
    return await this.anneeService.update(id, updateinput);
  }

  @Mutation(() => AnneeAccademique)
  async deleteanneeacademique(@Args('id') id: string) {
    return await this.anneeService.delete(id);
  }
}
