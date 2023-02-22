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
import { NiveauEtude } from 'src/entities/niveau-etude.entity';
import { PrimePersonnel } from 'src/entities/prime-personnel.entity';
import { NiveauEtudeCreateInput } from './dto/niveau-etude.input';
import { NiveauEtudeUpdateInput } from './dto/niveau-etude.update';
import { NiveauEtudeService } from './niveau-etude.service';


@Resolver(() => NiveauEtude)
export class NiveauEtudeResolver {
  constructor(private readonly niveauEtudeService: NiveauEtudeService) {}

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

  @Query(() => [NiveauEtude])
  async findAllNiveauEtude() {
    return await this.niveauEtudeService.getAll()
  }
  
  @Query(() => NiveauEtude, { name: 'niveaEtude' })
  async findOneNiveauEtude(@Args('id', { type: () => String }) id: string) {
    return await this.niveauEtudeService.findByOne(id);
  }

  @Query(() => NiveauEtude, { name: 'etatInscriptionNiveau' })
  async etatInscriptionNiveau(@Args('id', { type: () => String }) id: string) {
    return await this.niveauEtudeService.etatInscriptionNiveau(id);
  }
}
