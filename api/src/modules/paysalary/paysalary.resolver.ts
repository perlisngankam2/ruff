/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";4
import { PaySalary } from "src/entities/paysalary.entity";
import { PaySalaryService } from "./paysalary.service";
import { PaySalaryCreateInput } from "./dto/paysalary.create";
import { PaySalaryUpdateInput } from "./dto/paysalary.update";
import { PaySalaryPaginatedResponse } from "./type/studentpagination";
import { PaginationInput } from "src/pagination";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { Role } from "../auth/roles/roles";


@Resolver(() => PaySalary)
export class PaySalaryResolver {
  constructor(private readonly paysalaireService:PaySalaryService) {}

@Mutation(()=>PaySalary)
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ECONOME)
async createpaysalaire(@Args('input') input:PaySalaryCreateInput){
 return await this.paysalaireService.create(input)
}

@Mutation(()=>PaySalary)
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ECONOME)
async updatepaysalire(@Args('id') id:string,@Args('input') input: PaySalaryUpdateInput){
    return await this.paysalaireService.update(id,input)
}

@Mutation(()=>PaySalary)
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ECONOME)
async deletePaysalire(@Args('id') id:string){
    return await this.paysalaireService.delete(id)
}

@Query(()=>[PaySalary])
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ECONOME)
async findallpaysalaire(){
    return await this.paysalaireService.getAll()
}

@Query(()=>PaySalary)
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ECONOME)
async getonepaysalaire(@Args('id') id:string){
    return await this.paysalaireService.findByOne(id)
}

@Query(()=>[String])
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ECONOME)
async PersonnelMonthPaySalary(@Args('personnelid') personnelid:string){
    return await this.paysalaireService.personnelMonthSalary(personnelid)
}

@Query(() => PaySalaryPaginatedResponse)
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ECONOME)
async pagiantionResponsePaySalary(
  @Args('pagination') pagination: PaginationInput,
): Promise<PaySalaryPaginatedResponse> {
  return await this.paysalaireService.pagiantionResponsePaysalary(pagination);
}

@Query(()=>[PaySalary])
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ECONOME)
async getpaysalairebypersonnel(@Args('personnelid') personnelid:string){
    return await this.paysalaireService.salairepersonnel(personnelid)
}
}