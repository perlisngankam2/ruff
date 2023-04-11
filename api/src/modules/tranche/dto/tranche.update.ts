/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { AnneeAccademiqueCreateInput } from 'src/modules/anne_accademique/dto/anne-accademique.update';
import { CategoriePrimeCreateInput } from 'src/modules/categorie_prime/dto/categorie-prime.input';
import { PensionCreateInput } from 'src/modules/pension/dto/pension.input';
import { SalleCreateInput } from 'src/modules/salle/dto/salle.input';

@InputType()
export class TrancheUpdateInput {
  // @Field(()=>ID,{nullable:true})
  // pension_id?: string;

  @Field(()=>ID,{nullable:true})
  anneeAcademiqueId?:string

  @Field(()=>ID,{nullable:true})
  salleId?:string
  
  @Field(()=>ID,{nullable:true})
  tranchePriorityId?:string

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;


  @Field({nullable:true,defaultValue:0})
  montant?: number;

  @Field(()=>Date,{nullable:true})
  dateLine?: Date;

  // @Field(()=> PensionCreateInput,{nullable:true})
  // pension?:PensionCreateInput
}
