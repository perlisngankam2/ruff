/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { CategoriePrimeCreateInput } from 'src/modules/categorie_prime/dto/categorie-prime.input';
import { CategorieRetenuCreateInput } from 'src/modules/categorie_retenu/dto/categorie-retenu.input';
import { CategorieRetenuUpdateInput } from 'src/modules/categorie_retenu/dto/catetegorie-retenu.update';

@InputType()
export class RetenuUpdateInput {
  @Field({nullable:true})
  categorieretenuId?: string;

  @Field({nullable:true})
  nom?: string;

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:0})
  montant?: number;

  @Field(()=>CategorieRetenuUpdateInput,{nullable:true})
  categorieRetenu?:CategorieRetenuUpdateInput
}
