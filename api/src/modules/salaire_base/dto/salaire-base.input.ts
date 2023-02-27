/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { CategoriePersonnelCreateInput } from 'src/modules/categorie_personnel/dto/categorie-personnel.input';

@InputType()
export class SalaireBaseCreateInput {
  @Field(()=>ID,{ nullable: true })
  categoriepersonnelId:string

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:0})
  montant?: number;

  @Field(()=>CategoriePersonnelCreateInput,{nullable:true})
  categoriePersonnel?:CategoriePersonnelCreateInput
}
