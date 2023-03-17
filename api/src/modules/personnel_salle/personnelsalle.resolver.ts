/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PersonnelSalle } from "src/entities/personnelsalle.entity";
import { PersonnelSalleCreateInput } from "./dto/personnelsalle.create.input";
import { PersonnelSalleService } from "./personnelsalle.service";

@Resolver(() => PersonnelSalle)
export class PersonnelSalleResolver {
  constructor(private readonly personnelsalleService: PersonnelSalleService) {}

  @Mutation(() => PersonnelSalle)
  createPersonnelSalle(@Args('input') Input: PersonnelSalleCreateInput) {
    return this.personnelsalleService.create(Input);
  }

//    @Mutation(() => TrancheStudent)
//    updateTrancheStudent(@Args('id', { type: () => String }) id: string, Input: TrancheStudentUpdateInput) {
//      return this.trancheService.update(id,Input);
//   }

  @Query(() => [PersonnelSalle])
  findAllPersonnelSalle() {
    return this.personnelsalleService.findall()
  }
  
  @Query(() => PersonnelSalle)
  findOnePersonnelSalle(@Args('id', { type: () => String }) id: string) {
    return this.personnelsalleService.findByOne(id);
  }

  @Query(() => PersonnelSalle)
  async findbyCoursePersonnelSalle(
    @Args('salleid', { type: () => String }) salleid: string,
      @Args('personnelid', { type: () => String }) personnelid: string,
      @Args('courseid', { type: () => String }) courseid: string) {
    const a = (await this.personnelsalleService.findbyCoursePersonnelSalle(salleid,personnelid,courseid)).map(a=>a)[0];
    if(!a){
      throw Error("personnel salle not found")
    }
    return a
  }

  @Mutation(()=> PersonnelSalle)
  async deletePersonnelSalle(@Args('id') id:string){
 return await this.personnelsalleService.delete(id)
  }
}
