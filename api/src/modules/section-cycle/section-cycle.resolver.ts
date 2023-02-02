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
import { SectionCycle } from 'src/entities/section-cycle.entity';
import { SectionCycleCreateInput } from './dto/section-cycle.input';
import { SectionCycleUpdateInput } from './dto/section-cycle.update';
import { SectionCycleService } from './section-cycle.service';

@Resolver(() => SectionCycle)
export class SectionCycleResolver {
  constructor(private readonly sectionCycleService: SectionCycleService) {}

  @Mutation(() => SectionCycle)
  createSectionCycle(@Args('sectionCycle') input: SectionCycleCreateInput) {
    return this.sectionCycleService.create(input);
  }

  @Query(() => [SectionCycle])
  findAllsectioncycle() {
    return this.sectionCycleService.getAll()
  }

  @Query(() => SectionCycle, { name: 'sectionCycle' })
  findOnesectioncycle(@Args('id', { type: () => String }) id: string) {
    return this.sectionCycleService.findByOne(id);
  }

  @Query(() => SectionCycle, { name: 'etatInscription' })
  etatInscriptionSection(@Args('id', { type: () => String }) id: string) {
    return this.sectionCycleService.EtatInscriptionSection(id);
  }

  @Mutation(()=>SectionCycle)
  async updatesectioncycle(@Args('id') id:string,@Args('input') input:SectionCycleUpdateInput){
    return await this.sectionCycleService.update(id,input)
  }

  @Mutation(()=> SectionCycle)
  async deletesectioncycle(@Args('id') id:string){
 return await this.sectionCycleService.delete(id)
  }
}
