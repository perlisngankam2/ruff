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
import { FraisExamen } from 'src/entities/frais-exament.entity';
import { FraisExamentInput } from './dto/frais-exament.input';
import { UpdateFraisExamentInput } from './dto/frais-exament.update';
import { FraisExamenService } from './frais-examen.service';


@Resolver(() => FraisExamen)
export class FraisExamenResolver {
  constructor(private readonly fraisService: FraisExamenService) {}

  @Mutation(() => FraisExamen)
  async createFraisExamen(@Args('fraisExamen') Input: FraisExamentInput) {
    return await this.fraisService.create(Input);
  }

  @Query(() => [FraisExamen])
  async findAllfraisexam() {
    return await this.fraisService.getAll()
  }
  
  @Query(() => FraisExamen, { name: 'fraisExamen' })
  async findOnefraisexam(@Args('id', { type: () => String }) id: string) {
    return await this.fraisService.findByOne(id);
  }

  @Mutation(()=>FraisExamen)
  async updatefraisexam(@Args('id') id:string,@Args('input') input:UpdateFraisExamentInput){
   return await this.fraisService.update(id,input)
  }

  @Mutation(()=>FraisExamen)
  async deletefraisfraisexam(@Args('id') id:string){
 return await this.fraisService.deletefraisexam(id)
  }
}
