/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { RedutionScolariteInput } from 'src/modules/reduction_pension/dto/reduction-scolarite.input';

@InputType()
export class CategorieEleveUpdateInput {
  @Field({nullable:true})
  ID?: string;

  @Field({nullable:true})
  nom?: string;

  @Field({nullable:true})
  description?: string;

  // @Field({nullable:true})
  // reduction?: RedutionScolariteInput;
}
