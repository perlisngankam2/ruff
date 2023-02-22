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
import { PeriodeCreateInput } from './dto/periode.input';
import { PeriodeUpdateInput } from './dto/periode.update';
import { PeriodeService } from './periode.service';


@Resolver(() => Periode)
export class PeriodeResolver {
  constructor(private readonly periodeService: PeriodeService) {}

  @Mutation(() => Periode)
  async createperiod(@Args('periode') createPeriodeInput: PeriodeCreateInput) {
    return await this.periodeService.create(createPeriodeInput);
  }

  @Query(() => [Periode])
  async findAllperiod() {
    return await this.periodeService.getAll()
  }

  @Query(() => Periode, { name: 'periode' })
  async findOnePeriod(@Args('id', { type: () => String }) id: string) {
    return await this.periodeService.findByOne(id);
  }

  @Mutation(() => Periode)
  async updateperiod(@Args('id') id:string,@Args('input') input:PeriodeUpdateInput){
 return await this.periodeService.update(id,input)
  }

  @Mutation(() => Periode)
  async deleteperiod(@Args('id') id:string){
    return await this.periodeService.delete(id)
  }
}
