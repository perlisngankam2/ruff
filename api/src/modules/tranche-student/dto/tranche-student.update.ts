/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { TrancheCreateInput } from 'src/modules/tranche/dto/tranche.input';

@InputType()
export class TrancheStudentUpdateInput {

  @Field(()=>ID,{nullable:true})
  studentId?:string

  @Field(()=>ID,{nullable:true})
  trancheid?:string

  @Field({nullable:true})
  year?:string

  // @Field(()=>ID,{nullable:true})
  // anneeAcademiqueId?:string

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description!: string;

  @Field({nullable:true})
  montant?: number;

  // @Field(()=>RegimePaiement,{nullable:true})
  // regimePaimemnt?: RegimePaiement;

  // @Field(()=>StudentCreateInput,{nullable:true})
  // student?:StudentCreateInput
  
  @Field(()=>TrancheCreateInput,{nullable:true})
  tranche?:TrancheCreateInput
}