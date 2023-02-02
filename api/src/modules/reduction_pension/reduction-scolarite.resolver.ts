/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ReductionScolarite } from "../../entities/reduction-scolarite.entity";
import { RedutionScolariteInput } from "./dto/reduction-scolarite.input";
import { ReductionScolariteService } from "./reduction-scolarite.service";

@Resolver(() => ReductionScolarite)
export class ReductionScolariteResolver {
  constructor(private readonly ReductionService: ReductionScolariteService) {}

  @Mutation(() => ReductionScolarite)
  async createreductionscolarite(@Args('reductionscolarite') Input: RedutionScolariteInput) {
    return await this.ReductionService.create(Input);
  }

  @Query(() => [ReductionScolarite])
  async findAllreductionscolarite() {
    return await this.ReductionService.getAll()
  }
  
  @Query(() => ReductionScolarite, { name: 'primePersonnel' })
  async findOnereductionscolarite(@Args('id', { type: () => String }) id: string) {
    return await this.ReductionService.findByOne(id);
  }

  @Mutation(()=>ReductionScolarite)
  async updateprimepersonnel(@Args('id') id:string,@Args('input') input:RedutionScolariteInput){
    return await this.ReductionService.update(id,input)
  }

  @Mutation(()=> ReductionScolarite)
  async deleteprimepersonnel(@Args('id') id:string){
 return await this.ReductionService.delete(id)
  }

}