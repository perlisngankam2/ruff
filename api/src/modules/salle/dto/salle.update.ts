/* eslint-disable prettier/prettier */
import { NiveauEtudeUpdateInput } from './../../niveau_etude/dto/niveau-etude.update';
/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { NiveauEtudeCreateInput } from 'src/modules/niveau_etude/dto/niveau-etude.input';

@InputType()
export class SalleUpdateInput {
  @Field({nullable:true})
  ID?: string;
  
  @Field({nullable:true})
  name?: string;

  @Field(()=>ID,{nullable:true})
  sectionId?: string;

  @Field({nullable:true})
  cycle?: string;

  // @Field({nullable:true})
  // montantPension?: number;
  @Field(()=>ID, {nullable:true})
  niveauEtudeId?: string;
  
  @Field({nullable:true,defaultValue:0})
  effectif?: number;

  @Field({nullable:true})
  niveau: NiveauEtudeCreateInput
}
