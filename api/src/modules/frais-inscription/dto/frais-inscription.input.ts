/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { AnneeAccademiqueCreateInput } from 'src/modules/anne_accademique/dto/anne-accademique.update';
import { CategoriePrimeCreateInput } from 'src/modules/categorie_prime/dto/categorie-prime.input';
import { NiveauEtudeCreateInput } from 'src/modules/niveau_etude/dto/niveau-etude.input';
import { SalleCreateInput } from 'src/modules/salle/dto/salle.input';

@InputType()
export class FraisInscriptionInput {
  
  @Field(()=>ID,{nullable:true})
  salleId?:string

  @Field(()=>ID,{nullable:true})
  anneeAcademiqueId?:string

  @Field({nullable:true})
  nameFraisInscription?: string;

  @Field({nullable:true, defaultValue:0})
  montant?: number;

  // @Field({nullable:true})
  // dateLine?: Date;

  @Field(()=>SalleCreateInput,{nullable:true})
  salle?:SalleCreateInput

  @Field(()=>AnneeAccademiqueCreateInput,{nullable:true})
  anneeAccademique?:AnneeAccademiqueCreateInput

  // @Field({nullable:true})
  // niveauEtude?:NiveauEtudeCreateInput
}
