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


@Resolver(() => CategoriePersonnel)
export class CategoriePersonnelResolver {
  constructor(private readonly categorieService: CategoriePersonnelService) {}

  @Mutation(() => CategoriePersonnel)
  async createcategoriepersonnnel(@Args('createCategoriePersonnel') createCatgoriePersonnelInput: CategoriePersonnelCreateInput) {
    return await this.categorieService.create(createCatgoriePersonnelInput);
  }
  
  @Query(() => [CategoriePersonnel])
  async findAllcategoriepersonnel() {
    return await this.categorieService.getAll()
  }
  
  @Query(() => CategoriePersonnel)
  async findOneCategoriepersonnel(@Args('id', { type: () => String }) id: string) {
    return await this.categorieService.findByOne(id);
  }
 
  @Mutation(()=>CategoriePersonnel)
  async updatecategoriepersonnel(@Args('id') id:string,@Args('input') input:CategoriePersonnelUpdate){
  return await this.categorieService.update(id,input)
  }

  @Mutation(()=> CategoriePersonnel)
  async deletecategoriepersonnel(@Args('id') id:string){
 return await this.categorieService.delete(id)
  }
}
