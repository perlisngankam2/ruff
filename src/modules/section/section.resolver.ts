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
import { Periode } from 'src/entities/periode.entity';
import { Prime } from 'src/entities/prime.entity';
import { Section } from 'src/entities/section.entity';
import { SectionCreateInput } from './dto/section.input';
import { SectionUpdateInput } from './dto/section.update';
import { SectionService } from './section.service';

@Resolver(() => Section)
export class SectionResolver {
  constructor(private readonly sectionService: SectionService) {}

  @Mutation(() => Section)
  createSection(@Args('section') input: SectionCreateInput) {
    return this.sectionService.create(input);
  }

  @Query(() => [Section])
  findAllsection() {
    return this.sectionService.getAll()
  }

  @Query(() => Section)
  findOnesection(@Args('id', { type: () => String }) id: string) {
    return this.sectionService.findByOne(id);
  }

  @Mutation(()=>Section)
  async updatesection(@Args('id') id:string,@Args('input') input:SectionUpdateInput){
    return await this.sectionService.update(id,input)
  }

  @Mutation(()=> Section)
  async deletesection(@Args('id') id:string){
 return await this.sectionService.delete(id)
  }
}
