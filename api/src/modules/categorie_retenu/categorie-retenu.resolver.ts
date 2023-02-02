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
import { CategoriePrime } from 'src/entities/categorie-prime.entity';
import { CategorieRetenu } from 'src/entities/categorie-retenu.entity';
import { CategorieRetenuService } from './categorie-retenu.service';
import { CategorieRetenuCreateInput } from './dto/categorie-retenu.input';
import { CategorieRetenuUpdateInput } from './dto/catetegorie-retenu.update';


@Resolver(() => CategorieRetenu)
export class CategorieRetenuResolver {
  constructor(private readonly categorieRetenuService: CategorieRetenuService) {}

  @Mutation(() => CategorieRetenu)
  async createcategorieretenu(@Args('createCategorieRetenu') createCatgorieRetenuInput: CategorieRetenuCreateInput) {
    return await this.categorieRetenuService.create(createCatgorieRetenuInput);
  }
  
  @Query(() => [CategorieRetenu])
  async findAllcategorieretenu() {
    return await this.categorieRetenuService.getAll()
  }
  
  @Query(() => CategorieRetenu, { name: 'categorieRetenu' })
  async findOneCategorieRetenu(@Args('id', { type: () => String }) id: string) {
    return await this.categorieRetenuService.findByOne(id);
  }

  @Mutation(()=>CategorieRetenu)
  async updatecategorieretenu(@Args('id') id:string,@Args('input') input:CategorieRetenuUpdateInput){
  return await this.categorieRetenuService.update(id,input)
  }


}
