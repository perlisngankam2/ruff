/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { AnneeAccademiqueCreateInput } from 'src/modules/anne_accademique/dto/anne-accademique.update';
import { UpdateFraisInscriptionInput } from 'src/modules/frais-inscription/dto/frais-inscription.update';
import { NiveauEtudeCreateInput } from 'src/modules/niveau_etude/dto/niveau-etude.input';
import { StudentCreateInput } from 'src/modules/student/dto/student.input';

@InputType()
export class InscriptionUpdateInput {

  @Field(()=>ID,{nullable:true})
  fraisincription_id?:string

  @Field(()=>ID,{nullable:true})
  anneacademiqueId?:string

  @Field(()=>ID, {nullable:true})
  salleId?: string

  @Field(()=>ID, {nullable:true})
  studentId?: string

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;

  @Field({nullable:true})
  montant?: number;

  @Field({nullable:true})
  dateLine?: string;

  @Field(()=>UpdateFraisInscriptionInput,{nullable:true})
  fraisInscription?:UpdateFraisInscriptionInput

  @Field(()=>StudentCreateInput,{nullable:true})
  student?:StudentCreateInput

  @Field({nullable:true})
  anneeAccademique?:AnneeAccademiqueCreateInput
}
