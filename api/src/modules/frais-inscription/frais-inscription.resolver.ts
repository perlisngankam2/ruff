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
import { FraisInscription } from 'src/entities/frais-inscription.entity';
import { FraisInscriptionInput } from './dto/frais-inscription.input';
import { UpdateFraisInscriptionInput } from './dto/frais-inscription.update';
import { FraisInscriptionService } from './frais-inscription.service';


@Resolver(() => FraisInscription)
export class FraisInscriptionResolver {
  constructor(private readonly fraisService: FraisInscriptionService) {}

  @Mutation(() => FraisInscription)
  createFraisInscription(@Args('fraisInscription') Input: FraisInscriptionInput) {
    return this.fraisService.create(Input);
  }

  @Query(() => [FraisInscription])
  findAllfraisinscription() {
    return this.fraisService.getAll()
  }
  
  @Query(() => FraisInscription)
  findOnefraisincription(@Args('id', { type: () => String }) id: string) {
    return this.fraisService.findByOne(id);
  }

  @Mutation(() =>FraisInscription)
  async deletefraisincription(@Args('id') id:string){
  return await this.fraisService.delete(id)
  }

  @Mutation(() => FraisInscription)
  async upodatefraisinscription(@Args('id') id:string,@Args('input') input:UpdateFraisInscriptionInput){
  return await this.fraisService.update(id,input)
  }
}
