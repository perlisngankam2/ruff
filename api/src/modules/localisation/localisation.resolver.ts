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
import { Localisation } from 'src/entities/localisation.entity';
import { LocalisationCreateInput } from './dto/localisation.input';
import { LocalisationUpdateInput } from './dto/localisation.update';
import { LocalisationService } from './localisation.service';


@Resolver(() => Localisation)
export class LocalisationResolver {
  constructor(private readonly localisationService: LocalisationService) {}

  @Mutation(() => Localisation)
  async createLocalisation(@Args('createLocalisation') input: LocalisationCreateInput) {
    return await this.localisationService.create(input);
  }

  @Query(() => [Localisation])
  async findAlllocalistaion() {
    return await this.localisationService.getAll()
  }
  
  @Query(() => Localisation, { name: 'localisation' })
  async findOnelocalisation(@Args('id', { type: () => String }) id: string) {
    return await this.localisationService.findByOne(id);
  }

  @Mutation(() => Localisation)
  async updatelocalisation(@Args('id') id:string,@Args('input') input:LocalisationUpdateInput){
  return await this.localisationService.update(id,input)
  }

  @Mutation(()=>Localisation)
  async deletelocalisation(id:string){
  return await this.localisationService.delete(id)
  }

}
