/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Salle } from 'src/entities/salle.entity';
import { SalleCreateInput } from './dto/salle.input';
import { SalleUpdateInput } from './dto/salle.update';
import { SalleService } from './salle.service';
import { Section } from 'src/entities/section.entity';


@Resolver(() => Salle)
export class SalleResolver {
  constructor(private readonly salleService: SalleService) {}

  @Mutation(() => Salle)
  createSalle(@Args('salle') salaireCreateInput: SalleCreateInput) {
    return this.salleService.create(salaireCreateInput);
  }

  @Query(() => [Salle])
  findAllsalle() {
    return this.salleService.getAll()
  }
  
  @Query(() => Salle)
  findOnesalle(@Args('id', { type: () => String }) id: string) {
    return this.salleService.findByOne(id);
  }

  @Query(() => Salle, { name: 'etatInscriptionSalle' })
  inscriptionSalle(@Args('id', { type: () => String }) id: string) {
    return this.salleService.inscriptionRecuSalle(id);
  }

  @Mutation(()=>Salle)
  async updateprimepersonnel(@Args('id') id:string,@Args('input') input:SalleUpdateInput){
    return await this.salleService.update(id,input)
  }

  @Mutation(()=> Salle)
  async deleteprimepersonnel(@Args('id') id:string){
 return await this.salleService.delete(id)
  }

  @Mutation(()=>Salle)
  async deleteSalle(@Args('id') id:string){
   return this.salleService.deleteSalle(id)
  }

  
  @Mutation(()=>Salle)
  async UpdateSalle(@Args('id') id:string, @Args('input') input:SalleUpdateInput){
   return this.salleService.update(id,input)
  }

  @Query(() => Salle)
  async findSalleByStudent(@Args('studentid', { type: () => String }) studentid: string) {
    const a =await this.salleService.findStudentBySalle(studentid);
   if(!a){
  throw Error("Classe not found!!!!!!!")
   }
   return a
  }

  @Query(() => [Salle])
  async salleAnglophoneSection(){
    return await this.salleService.salleAnglophoneSection()
  }

  @Query(() => Number)
  async NumberofStudentsSalleAnglophoneSection(){
    return await this.salleService.NumberofStudentsSalleAnglophoneSection()
  }

  @Query(() => [Section])
  async findSectionByStudent(@Args('studentid', { type: () => String }) studentid: string) {
   return await this.salleService.findSectionByStudent(studentid)
  }

}
