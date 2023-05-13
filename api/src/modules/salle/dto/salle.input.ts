/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { NiveauEtudeCreateInput } from 'src/modules/niveau_etude/dto/niveau-etude.input';

@InputType()
export class SalleCreateInput {
  @Field(()=>ID,{nullable:true})
  ID?: string;

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  anneeAcademiqueId?: string;

  @Field(()=>ID,{nullable:true})
  sectionId?: string;

  @Field({nullable:true})
  cycleId?: string;

  @Field({nullable:true})
  montantPensionSalle?: number;

  @Field({nullable:true,defaultValue:0})
  effectif?: number;

  @Field(()=>ID, {nullable:true})
  niveauEtudeId?: string;
 
  @Field({nullable:true})
  niveau: NiveauEtudeCreateInput
}
