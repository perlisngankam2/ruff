/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { CategoriePrimeCreateInput } from 'src/modules/categorie_prime/dto/categorie-prime.input';
import { CategorieRetenuCreateInput } from 'src/modules/categorie_retenu/dto/categorie-retenu.input';

@InputType()
export class UpdateReductionScolariteInput {
  @Field({nullable:true})
  ID!: string;

  @Field({nullable:true})
  name!: string;

  @Field({nullable:true})
  description!: string;

  @Field({nullable:true})
  montant!: number;

  @Field({nullable:true})
  pourcentage!: number;
}
