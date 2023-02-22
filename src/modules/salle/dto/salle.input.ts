/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { NiveauEtudeCreateInput } from 'src/modules/niveau_etude/dto/niveau-etude.input';
import { NiveauEtudeUpdateInput } from 'src/modules/niveau_etude/dto/niveau-etude.update';

@InputType()
export class SalleCreateInput {
  @Field({nullable:true})
  ID?: string;

  @Field({nullable:true})
  name?: string;

  // @Field(()=>ID,{nullable:true})
  // section_id?: string;

  // @Field(()=>ID,{nullable:true})
  // cycle_id?: string;

  @Field(()=>ID,{nullable:true})
  niveau_id?: string;

  @Field({nullable:true,defaultValue:0})
  effectif?: number;

  @Field({nullable:true})
  niveau: NiveauEtudeUpdateInput
}
