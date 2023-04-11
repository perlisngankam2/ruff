/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { PensionCreateInput } from 'src/modules/pension/dto/pension.input';

@InputType()
export class TrancheCreateInput {
  // @Field(()=>ID,{nullable:true})
  // pension_id?: string;
  @Field(()=>ID,{nullable:true})
  anneeAcademiqueId?:string

  @Field(()=>ID,{nullable:true})
  tranchepriorityId?:string

  @Field(()=>ID,{nullable:true})
  salleId?:string

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
