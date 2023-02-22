/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TrancheStudent } from "../../entities/tranche-student.entity";
import { AvanceTranche } from "../../entities/avance-tranche.entity";
import { AvanceTrancheService } from "./avance-tranche.service";
import { AvanceTrancheCreateInput } from "./dto/avance-tranche.input";



@Resolver(() => AvanceTranche)
export class AvanceTrancheResolver {
  constructor(private readonly avancetrancheService: AvanceTrancheService) {}

@Mutation(() => AvanceTranche)
async createavancetranche(@Args('avancetranche') input: AvanceTrancheCreateInput) {
  return await this.avancetrancheService.createavancetranche(input);
}

@Mutation(() => AvanceTranche)
async saveavancetranche(@Args('tranchestudent') input:string,@Args('number') number: number) {
  return await this.avancetrancheService.saveAvanceTranche(input,number);
}

@Query(() => AvanceTranche)
async findavancetranchebyid(@Args('input') input: string){
return await this.avancetrancheService.findByIdavancetranche(input)
}

@Query(() => [AvanceTranche])
async findallavancetranche(){
    return await this.avancetrancheService.getAllavancetranche()
}

@Mutation(() => AvanceTranche)
async deleteavancetranche(@Args('id') id:string){
    return await this.avancetrancheService.deleteavancetranche(id)
}

}