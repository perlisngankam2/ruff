/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { CategoriePersonnelCreateInput } from 'src/modules/categorie_personnel/dto/categorie-personnel.input';
import { CategoriePersonnelUpdate } from 'src/modules/categorie_personnel/dto/categorie-personnel.update';

@InputType()
export class SalaireBaseUpdateInput {

  @Field(()=>ID,{ nullable: true })
  categoriepersonnelId:string

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:0})
  montant?: number;

  @Field(()=>CategoriePersonnelUpdate,{nullable:true})
  categoriePersonnel?:CategoriePersonnelUpdate
}
