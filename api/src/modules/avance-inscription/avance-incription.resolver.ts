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
import { AvanceInscription } from '../../entities/avance-inscription.entity';
import { AvanceInscriptionService } from './avance-inscription.service';
import { AvanceInscriptionCreateInput } from './dto/avance-inscription.input';
import { AvanceInscriptionUpdateInput } from './dto/avance-inscription.update';


@Resolver(() => AvanceInscription)
export class AvanceInscriptionResolver {
  constructor(private readonly avanceinscriptionService: AvanceInscriptionService) {}

  @Mutation(() => AvanceInscription)
  createAvanceInscription(@Args('avanceInscription') Input: AvanceInscriptionCreateInput) {
    return this.avanceinscriptionService.create(Input);
  }

  @Mutation(() => AvanceInscription)
  updateavanceinscription(@Args('inscription') Input: AvanceInscriptionUpdateInput, viewer: AvanceInscription,) {
    return this.avanceinscriptionService.update(viewer,Input);
  }

  @Query(() => [AvanceInscription])
  findAllavanceinscription() {
    return this.avanceinscriptionService.getAll()
  }
  
  @Query(() => AvanceInscription, { name: 'avanceInscription' })
  findOneavanceincription(@Args('id', { type: () => String }) id: string) {
    return this.avanceinscriptionService.findByOne(id);
  }

}

