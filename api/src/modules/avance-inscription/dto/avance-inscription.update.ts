/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { Inscription } from 'src/entities/inscription.entity';
import { RegimePaiement } from 'src/entities/tranche-student.entity';
import { InscriptionUpdateInput } from 'src/modules/inscription/dto/incription.update';

import { StudentCreateInput } from 'src/modules/student/dto/student.input';
import { TrancheCreateInput } from 'src/modules/tranche/dto/tranche.input';

@InputType()
export class AvanceInscriptionUpdateInput {
  @Field(()=>ID,{nullable:true})
  inscription_id?:string
  
  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;

  @Field({nullable:true,defaultValue:0})
  montant?: number;

  @Field({nullable:true,defaultValue:0})
  reste?: number;

  @Field(()=>InscriptionUpdateInput,{nullable:true})
  inscription?:InscriptionUpdateInput
}
