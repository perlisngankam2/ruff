/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Salaire } from "src/entities/salaire.entity";
import { SalaireCreateInput } from "./dto/salaire.input";
import { SalaireUpdateInput } from "./dto/salaire.update";
import { SalaireService } from "./salaire.service";
import { SalairePaginatedResponse } from "./type/salairepagination";
import { PaginationInput } from "src/pagination";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { UseGuards } from "@nestjs/common";
import { Roles } from "../auth/decorators/roles.decorator";
import { Role } from "../auth/roles/roles";

@Resolver(() => Salaire)
export class SalaireResolver {
  constructor(private readonly salaireService: SalaireService) {}

@Mutation(()=>Salaire)
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ECONOME)
async createsalaire(@Args('input') input:SalaireCreateInput){
 return await this.salaireService.create(input)
}

@Query(() => SalairePaginatedResponse)
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ECONOME)
async pagiantionResponseSalaire(
@Args('pagination') pagination: PaginationInput,
): Promise<SalairePaginatedResponse> {
return await this.salaireService.paginationResponseSalaire(pagination);
}
// @Mutation(()=>Salaire)
// async updatesalire(@Args('id') id:string,@Args('input') input: SalaireUpdateInput){
//     return await this.salaireService.update(id,input)
// }

@Query(()=>[Salaire])
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ECONOME)
async findallsalaire(){
    return await this.salaireService.getAll()
}

@Query(()=>Salaire)
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ECONOME)
async getonesalaire(@Args('id') id:string){
    return await this.salaireService.findByOne(id)
}

@Query(()=>[Salaire])
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ECONOME)
async getsalairebypersonnel(@Args('personnelid') personnelid:string){
    return await this.salaireService.salairepersonnel(personnelid)
}

@Query(()=>[String])
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ECONOME)
async PersonnelMonthSalary(@Args('personnelid') personnelid:string){
    return await this.salaireService.personnelMonthSalary(personnelid)
}

@Query(()=>[Number])
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ECONOME)
async PersonnelNetSalary(@Args('personnelid') personnelid:string){
    return await this.salaireService.personnelNetSalary(personnelid)
}

@Query(()=>Number)
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ECONOME)
async personnelsalairenetbymonth(@Args('personnelid') personnelid:string,@Args('month') month:string){
    return await this.salaireService.personnelsalairenetbymonth(personnelid,month)
}

}