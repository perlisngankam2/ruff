/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PaySalaire } from "src/entities/pay_salary.entity";
import { Salaire } from "src/entities/salaire.entity";
import { PaySalaireService } from "./paysalary.service";
import { PaySalaireCreateInput } from "./dto/paysalary.create";
import { PaySalaireUpdateInput } from "./dto/paysalary.update";


@Resolver(() => PaySalaire)
export class PaySalaireResolver {
  constructor(private readonly paysalaireService: PaySalaireService) {}

@Mutation(()=>PaySalaire)
async createpaysalaire(@Args('input') input:PaySalaireCreateInput){
 return await this.paysalaireService.create(input)
}

@Mutation(()=>PaySalaire)
async updatepaysalire(@Args('id') id:string,@Args('input') input: PaySalaireUpdateInput){
    return await this.paysalaireService.update(id,input)
}

@Query(()=>[PaySalaire])
async findallpaysalaire(){
    return await this.paysalaireService.getAll()
}

@Query(()=>PaySalaire)
async getonepaysalaire(@Args('id') id:string){
    return await this.paysalaireService.findByOne(id)
}

@Query(()=>[Salaire])
async getpaysalairebypersonnel(@Args('personnelid') personnelid:string){
    return await this.paysalaireService.salairepersonnel(personnelid)
}
}