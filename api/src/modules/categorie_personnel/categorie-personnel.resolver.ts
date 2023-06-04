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
import { CategoriePersonnel } from 'src/entities/categorie-personnel.entity';
import { CategoriePersonnelService } from './categorie-personnel.service';
import { CategoriePersonnelCreateInput } from './dto/categorie-personnel.input';
import { CategoriePersonnelUpdate } from './dto/categorie-personnel.update';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles';


@Resolver(() => CategoriePersonnel)
export class CategoriePersonnelResolver {
  constructor(private readonly categorieService: CategoriePersonnelService) {}

  @Mutation(() => CategoriePersonnel)
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.PRINCIPAL)
  async createcategoriepersonnnel(@Args('createCategoriePersonnel') createCatgoriePersonnelInput: CategoriePersonnelCreateInput) {
    return await this.categorieService.create(createCatgoriePersonnelInput);
  }
  
  @Query(() => [CategoriePersonnel])
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.PRINCIPAL, Role.FONDATEUR)
  async findAllcategoriepersonnel() {
    return await this.categorieService.getAll()
  }
  
  @Query(() => CategoriePersonnel)
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.PRINCIPAL)
  async findOneCategoriepersonnel(@Args('id', { type: () => String }) id: string) {
    return await this.categorieService.findByOne(id);
  }
 
  @Mutation(()=>CategoriePersonnel)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async updatecategoriepersonnel(@Args('id') id:string,@Args('input') input:CategoriePersonnelUpdate){
  return await this.categorieService.update(id,input)
  }

  @Mutation(()=> CategoriePersonnel)
  async deletecategoriepersonnel(@Args('id') id:string){
 return await this.categorieService.delete(id)
  }
}
