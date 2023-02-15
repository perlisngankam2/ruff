/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { NiveauEtudeCreateInput } from 'src/modules/niveau_etude/dto/niveau-etude.input';

@InputType()
export class SalleUpdateInput {
  @Field(()=>ID,{nullable:true})
  niveau_id?: string;

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;

  @Field({nullable:true})
  effectif?: number;

  @Field(()=>NiveauEtudeCreateInput,{nullable:true})
  niveau?: NiveauEtudeCreateInput
}
