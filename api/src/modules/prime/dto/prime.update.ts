/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { CategoriePrimeCreateInput } from 'src/modules/categorie_prime/dto/categorie-prime.input';
import { CategoriePrimeUpdate } from 'src/modules/categorie_prime/dto/categorie-prime.update';

@InputType()
export class PrimeUpdateInput {
  @Field(()=>ID,{ nullable: true })
  categorieId:string

  @Field({nullable:true})
  nom?: string;

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:0})
  montant?: number;

  @Field(()=>CategoriePrimeUpdate,{nullable:true})
  categoriePirme?:CategoriePrimeUpdate
}
