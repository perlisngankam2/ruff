/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TrancheStudent } from "../../entities/tranche-student.entity";
import { AvanceTranche } from "../../entities/avance-tranche.entity";
import { AvanceTrancheService } from "./avance-tranche.service";
import { AvanceTrancheCreateInput } from "./dto/avance-tranche.input";
import { Tranche } from "src/entities/tranche.entity";
import { AvanceTranchePaginatedResponse } from "./type/avancetranchepagination";
import { PaginationInput } from "src/pagination";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { Role } from "../auth/roles/roles";



@Resolver(() => AvanceTranche)
export class AvanceTrancheResolver {
  constructor(private readonly avancetrancheService: AvanceTrancheService) {}

@Mutation(() => AvanceTranche)
// @UseGuards(JwtAuthGuard,RolesGuard)
// @Roles(Role.ECONOME)
async createavancetranche(@Args('avancetranche') input: AvanceTrancheCreateInput):Promise<AvanceTranche|null> {
  return await this.avancetrancheService.createavancetranche(input);
}

// @Mutation(() => AvanceTranche)
// async saveavancetranche(@Args('tranchestudent') input:string,@Args('number') number: number) {
//   return await this.avancetrancheService.saveAvanceTranche(input,number);
// }

@Query(() => AvanceTranche)
// @UseGuards(JwtAuthGuard,RolesGuard)
// @Roles(Role.ECONOME)
async findavancetranchebyid(@Args('input') input: string){
return await this.avancetrancheService.findByIdavancetranche(input)
}

@Query(() => [AvanceTranche])
// @UseGuards(JwtAuthGuard,RolesGuard)
// @Roles(Role.ECONOME)
async findallavancetranche(){
    return await this.avancetrancheService.getAllavancetranche()
}

@Mutation(() => AvanceTranche)
// @UseGuards(JwtAuthGuard,RolesGuard)
// @Roles(Role.ECONOME)
async deleteavancetranche(@Args('id') id:string){
    return await this.avancetrancheService.deleteavancetranche(id)
}

@Query(()=>Number)
// @UseGuards(JwtAuthGuard,RolesGuard)
// @Roles(Role.ECONOME)
async SumAvanceTrancheByTranche(@Args('trancheid') trancheid:string){
   return await this.avancetrancheService.SumAvanceTrancheByTranche(trancheid)
}

@Query(()=>Number)
// @UseGuards(JwtAuthGuard,RolesGuard)
// @Roles(Role.ECONOME)
async AmountMostRecentAvanceTranche(@Args('trancheid') trancheid:string){
 return await this.avancetrancheService.AmountMostRecentAvanceTranche(trancheid)
}

@Query(()=>Number)
// @UseGuards(JwtAuthGuard,RolesGuard)
// @Roles(Role.ECONOME)
  async MostRecentAvanceTranche(){
  return await this.avancetrancheService.MostRecentAvanceTranche()
}

@Query(()=>Number)
// @UseGuards(JwtAuthGuard,RolesGuard)
// @Roles(Role.ECONOME)
async AmountRecentAvanceTrancheByStudent(@Args('studentid') studentid:string){
return await this.avancetrancheService.AmountRecentAvanceTrancheByStudent(studentid)
}

@Query(()=>Number)
// @UseGuards(JwtAuthGuard,RolesGuard)
// @Roles(Role.ECONOME)
async SumAvanceTrancheByStudent(@Args('studentid') studentid:string,@Args('trancheid') trancheid:string){
return await this.avancetrancheService.SumAvanceTrancheByStudent(studentid,trancheid)
}

@Query(()=>[Tranche])
// @UseGuards(JwtAuthGuard,RolesGuard)
// @Roles(Role.ECONOME)
async getallfessalreadypayed(@Args('studentid') studentid:string){
return await this.avancetrancheService.feesalreadypayed(studentid)
}

// @Query(()=>Number)
// async RestTrancheByStudent(@Args('studentid') studentid:string,@Args('trancheid') trancheid:string){
// return await this.avancetrancheService.RestAvanceTrancheByStudent(studentid,trancheid)
// }

@Query(()=>[Tranche])
// @UseGuards(JwtAuthGuard,RolesGuard)
// @Roles(Role.ECONOME)
async getalltranchecompletedbystudent(@Args('studentid') studentid:string){
return await this.avancetrancheService.TranchecompletedByStudent(studentid)
}

@Query(()=>[Tranche])
// @UseGuards(JwtAuthGuard,RolesGuard)
// @Roles(Role.ECONOME)
async RestTuitionFeebystudent(@Args('studentid') studentid:string){
return await this.avancetrancheService.ResttuitionfeeByStudent(studentid)
}

@Query(() => AvanceTranchePaginatedResponse)
// @UseGuards(JwtAuthGuard,RolesGuard)
// @Roles(Role.ECONOME)
async pagiantionResponseAvanceTranche(
  @Args('pagination') pagination: PaginationInput,
): Promise<AvanceTranchePaginatedResponse> {
  return await this.avancetrancheService.pagiantionResponseAvanceTranche(pagination);
}


}