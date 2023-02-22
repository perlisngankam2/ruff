/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { AnneeAccademiqueCreateInput } from 'src/modules/anne_accademique/dto/anne-accademique.update';
import { CategoriePrimeCreateInput } from 'src/modules/categorie_prime/dto/categorie-prime.input';
import { NiveauEtudeCreateInput } from 'src/modules/niveau_etude/dto/niveau-etude.input';
import { SalleUpdateInput } from 'src/modules/salle/dto/salle.update';


@InputType()
export class UpdateFraisInscriptionInput {
  @Field(()=>ID,{nullable:true})
  salle_id?:string

  @Field(()=>ID,{nullable:true})
  anneAcademique_id?:string

  @Field({nullable:true})
  description?: string;

  @Field({nullable:true, defaultValue:0})
  montant?: number;

  @Field({nullable:true})
  dateLine?: Date;

  @Field(()=>SalleUpdateInput,{nullable:true})
  salle?:SalleUpdateInput

  @Field(()=>AnneeAccademiqueCreateInput,{nullable:true})
  anneeAccademique?:AnneeAccademiqueCreateInput
}