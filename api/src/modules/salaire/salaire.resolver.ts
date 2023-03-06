/* eslint-disable prettier/prettier */
import { Args, Resolver } from "@nestjs/graphql";
import { Salaire } from "src/entities/salaire.entity";
import { SalaireCreateInput } from "./dto/salaire.input";
import { SalaireUpdateInput } from "./dto/salaire.update";
import { SalaireService } from "./salaire.service";

@Resolver(() => Salaire)
export class SalaireResolver {
  constructor(private readonly salaireService: SalaireService) {}

async createsalaire(@Args('input') input:SalaireCreateInput){
 return await this.salaireService.create(input)
}

async updatesalire(@Args('id') id:string,@Args('input') input: SalaireUpdateInput){
    return await this.salaireService.update(id,input)
}

async findallsalaire(){
    return await this.salaireService.getAll()
}

async getonesalaire(@Args('id') id:string){
    return await this.salaireService.findByOne(id)
}

}