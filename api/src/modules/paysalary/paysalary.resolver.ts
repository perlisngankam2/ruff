/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";4
import { PaySalary } from "src/entities/paysalary.entity";
import { PaySalaryService } from "./paysalary.service";
import { PaySalaryCreateInput } from "./dto/paysalary.create";
import { PaySalaryUpdateInput } from "./dto/paysalary.update";


@Resolver(() => PaySalary)
export class PaySalaryResolver {
  constructor(private readonly paysalaireService:PaySalaryService) {}

@Mutation(()=>PaySalary)
async createpaysalaire(@Args('input') input:PaySalaryCreateInput){
 return await this.paysalaireService.create(input)
}

@Mutation(()=>PaySalary)
async updatepaysalire(@Args('id') id:string,@Args('input') input: PaySalaryUpdateInput){
    return await this.paysalaireService.update(id,input)
}

@Query(()=>[PaySalary])
async findallpaysalaire(){
    return await this.paysalaireService.getAll()
}

@Query(()=>PaySalary)
async getonepaysalaire(@Args('id') id:string){
    return await this.paysalaireService.findByOne(id)
}

@Query(()=>[PaySalary])
async getpaysalairebypersonnel(@Args('personnelid') personnelid:string){
    return await this.paysalaireService.salairepersonnel(personnelid)
}
@Mutation(()=>PaySalary)
async deletePaysalire(@Args('id') id:string){
    return await this.paysalaireService.delete(id)
}

@Query(()=>[String])
async PersonnelMonthPaySalary(@Args('personnelid') personnelid:string){
    return await this.paysalaireService.personnelMonthSalary(personnelid)
}

}