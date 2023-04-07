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


import { TranchePriorityInput } from './dto/tranche-priority.input';
import { TranchePriorityService } from './tranche-priority.service';
import { TranchePriority } from 'src/entities/tranche-priority.entity';


@Resolver(() => TranchePriority)
export class TranchePriorityResolver {
  constructor(private readonly tranchePriorityService: TranchePriorityService) {}

  @Mutation(() => TranchePriority)
  createtranchepriority(@Args('input') Input: TranchePriorityInput) {
    return this.tranchePriorityService.create(Input);
  }

  @Query(() => [TranchePriority])
  findAlltranchepriority() {
    return this.tranchePriorityService.getAll()
  }
  
  @Query(() => TranchePriority)
  findOnetranchepriority(@Args('id', { type: () => String }) id: string) {
    return this.tranchePriorityService.findByOne(id);
  }

}


