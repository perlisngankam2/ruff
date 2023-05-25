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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles';
import { CourseUpdateInput } from '../course/dto/course.updateinput';

@Resolver(() => Salle)
export class SalleResolver {
  constructor(private readonly salleService: SalleService) {}

  @Mutation(() => Salle)
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.PRINCIPAL)
  createSalle(@Args('salle') salaireCreateInput: SalleCreateInput) {
    return this.salleService.create(salaireCreateInput);
  }

  @Query(() => [Salle])
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.FONDATEUR, Role.PRINCIPAL)
  findAllsalle() {
    return this.salleService.getAll()
  }
  
  @Query(() => Salle)
  @Roles(Role.FONDATEUR, Role.PRINCIPAL)
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
  @Roles(Role.FONDATEUR, Role.PRINCIPAL)
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
   return await this.salleService.findSectionByStudents(studentid)
  }

}
