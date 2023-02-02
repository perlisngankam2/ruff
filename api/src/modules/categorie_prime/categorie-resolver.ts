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
import { CategoriePrimeService } from './categorie-prime.service';
import { CategoriePrimeCreateInput } from './dto/categorie-prime.input';
import { CategoriePrimeUpdate } from './dto/categorie-prime.update';


@Resolver(() => CategoriePrime)
export class CategoriePrimeResolver {
  constructor(private readonly categoriePrimeService: CategoriePrimeService) {}

  @Mutation(() => CategoriePrime)
  async createcategorieprime(@Args('createCategoriePrime') createCatgoriePrimeInput: CategoriePrimeCreateInput) {
    return await this.categoriePrimeService.create(createCatgoriePrimeInput);
  }
  
  @Query(() => [CategoriePrime])
  async findAllcategorieprime() {
    return await this.categoriePrimeService.getAll()
  }
  
  @Query(() => CategoriePrime, { name: 'categoriePrime' })
  async findOneCategoriePrime(@Args('id', { type: () => String }) id: string) {
    return await this.categoriePrimeService.findByOne(id);
  }

  @Mutation(() => CategoriePrime)
  async updatecategorieprime(@Args('id') id:string,@Args('input') input:CategoriePrimeUpdate){
  return await this.categoriePrimeService.update(id,input)
  }

  @Mutation(()=> CategoriePrime)
  async deletecategorieprime(@Args('id') id:string){
 return await this.categoriePrimeService.delete(id)
  }
}
