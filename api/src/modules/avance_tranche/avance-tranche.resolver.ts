/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TrancheStudent } from "../../entities/tranche-student.entity";
import { AvanceTranche } from "../../entities/avance-tranche.entity";
import { AvanceTrancheService } from "./avance-tranche.service";
import { AvanceTrancheCreateInput } from "./dto/avance-tranche.input";
import { Tranche } from "src/entities/tranche.entity";



@Resolver(() => AvanceTranche)
export class AvanceTrancheResolver {
  constructor(private readonly avancetrancheService: AvanceTrancheService) {}

@Mutation(() => AvanceTranche)
async createavancetranche(@Args('avancetranche') input: AvanceTrancheCreateInput):Promise<AvanceTranche|null> {
  return await this.avancetrancheService.createavancetranche(input);
}

// @Mutation(() => AvanceTranche)
// async saveavancetranche(@Args('tranchestudent') input:string,@Args('number') number: number) {
//   return await this.avancetrancheService.saveAvanceTranche(input,number);
// }

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

@Query(()=>Number)
async SumAvanceTrancheByTranche(@Args('trancheid') trancheid:string){
   return await this.avancetrancheService.SumAvanceTrancheByTranche(trancheid)
}

@Query(()=>Number)
async AmountMostRecentAvanceTranche(@Args('trancheid') trancheid:string){
 return await this.avancetrancheService.AmountMostRecentAvanceTranche(trancheid)
}

@Query(()=>Number)
  async MostRecentAvanceTranche(){
  return await this.avancetrancheService.MostRecentAvanceTranche()
}

@Query(()=>Number)
async AmountRecentAvanceTrancheByStudent(@Args('studentid') studentid:string){
return await this.avancetrancheService.AmountRecentAvanceTrancheByStudent(studentid)
}

@Query(()=>Number)
async SumAvanceTrancheByStudent(@Args('studentid') studentid:string,@Args('trancheid') trancheid:string){
return await this.avancetrancheService.SumAvanceTrancheByStudent(studentid,trancheid)
}

@Query(()=>[Tranche])
async getallfessalreadypayed(@Args('studentid') studentid:string){
return await this.avancetrancheService.feesalreadypayed(studentid)
}

// @Query(()=>Number)
// async RestTrancheByStudent(@Args('studentid') studentid:string,@Args('trancheid') trancheid:string){
// return await this.avancetrancheService.RestAvanceTrancheByStudent(studentid,trancheid)
// }

@Query(()=>[Tranche])
async getalltranchecompletedbystudent(@Args('studentid') studentid:string){
return await this.avancetrancheService.TranchecompletedByStudent(studentid)
}

@Query(()=>[Tranche])
async RestTuitionFeebystudent(@Args('studentid') studentid:string){
return await this.avancetrancheService.ResttuitionfeeByStudent(studentid)
}


}