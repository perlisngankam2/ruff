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
  Root,
} from '@nestjs/graphql';
import { NiveauEtude } from 'src/entities/niveau-etude.entity';
import { PrimePersonnel } from 'src/entities/prime-personnel.entity';
import { NiveauEtudeCreateInput } from './dto/niveau-etude.input';
import { NiveauEtudeUpdateInput } from './dto/niveau-etude.update';
import { NiveauEtudeService } from './niveau-etude.service';
import { Cycle } from 'src/entities/cycle.entity';
import { CycleService } from '../cycle/cycle.service';
import { Salle } from 'src/entities/salle.entity';
import { Loaded } from '@mikro-orm/core';


@Resolver(() => NiveauEtude)
export class NiveauEtudeResolver {
  constructor(private readonly niveauEtudeService: NiveauEtudeService,
              private readonly cycleService: CycleService,) {}

  @Mutation(() => NiveauEtude)
  async createNiveauEtude(@Args('niveauEtude') Input: NiveauEtudeCreateInput) {
    return await this.niveauEtudeService.create(Input);
  }

   @Mutation(() => NiveauEtude)
  async updateNiveauEtude(@Args('id', { type: () => String }) id: string, Input: NiveauEtudeUpdateInput) {
    return await this.niveauEtudeService.update(id,Input);
  }

  @Mutation(()=>NiveauEtude)
  async deleteNiveauEtude(@Args('id') id:string){
   return await this.niveauEtudeService.delete(id)
  }

  @Query(()=>[[String],[String]])
  async findallniveauetude() {
    return await this.niveauEtudeService.getAll();
  }
  

  @Query(() => NiveauEtude)
  async findOneNiveauEtude(@Args('id', { type: () => String }) id: string) {
    return await this.niveauEtudeService.findByOne(id);
  }

  @Query(() => NiveauEtude, { name: 'etatInscriptionNiveau' })
  async etatInscriptionNiveau(@Args('id', { type: () => String }) id: string) {
    return await this.niveauEtudeService.etatInscriptionNiveau(id);
  }
}
