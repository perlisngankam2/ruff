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


@Resolver(() => SalaireBase)
export class SalaireBaseResolver {
  constructor(private readonly salaireBaseService: SalaireBaseService) {}

  @Mutation(() => SalaireBase)
  createsalairebase(@Args('salaireBase') salaireCreateInput: SalaireBaseCreateInput) {
    return this.salaireBaseService.create(salaireCreateInput);
  }

  @Query(() => [SalaireBase])
  findAllsalaire() {
    return this.salaireBaseService.getAll()
  }
  
  @Query(() => SalaireBase, { name: 'salaireBase' })
  findOnesalaire(@Args('id', { type: () => String }) id: string) {
    return this.salaireBaseService.findByOne(id);
  }

  @Mutation(()=>SalaireBase)
  async updatesalairebase(@Args('id') id:string,@Args('input') input:SalaireBaseUpdateInput){
    return await this.salaireBaseService.update(id,input)
  }

  @Mutation(()=> SalaireBase)
  async deletesalairebase(@Args('id') id:string){
 return await this.salaireBaseService.delete(id)
  }

}
