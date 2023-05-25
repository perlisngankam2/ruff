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
import { CategorieEleve } from 'src/entities/categorie-eleve.entity';
import { CategorieEleveService } from './categorie-eleve.service';
import { CategorieEleveCreateInput } from './dto/categorie-eleve.input';
import { CategorieEleveUpdateInput } from './dto/categorie-eleve.update';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles';


@Resolver(() => CategorieEleve)
export class CategorieEleveResolver {
  constructor(private readonly categorieService: CategorieEleveService) {}

  @Mutation(() => CategorieEleve)
     @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async createcategorieeleve(@Args('createCategorieEleve') createCatgorieEleveInput: CategorieEleveCreateInput) {
    return await this.categorieService.create(createCatgorieEleveInput);
  }
  
  @Query(() => [CategorieEleve])
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async findAllcategorieeleve() {
    return await this.categorieService.getAll()
  }
  
  @Query(() => CategorieEleve)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async findOneCategorieeleve(@Args('id', { type: () => String }) id: string) {
    return await this.categorieService.findByOne(id);
  }

  @Mutation(()=> CategorieEleve)
  async deletecategorieeleve(@Args('id') id:string) {
   return await this.categorieService.deletecategorie(id)
  }

  @Mutation(()=> CategorieEleve)
  async updatecategorieeleve(@Args('id') id:string,@Args('input') input:CategorieEleveUpdateInput ){
    return await this.categorieService.update(id,input)
  }
}
