/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { RegimePaiement } from 'src/entities/tranche-student.entity';
import { StudentCreateInput } from 'src/modules/student/dto/student.input';
import { TrancheStudentCreateInput } from 'src/modules/tranche-student/dto/tranche-student.input';
import { TrancheCreateInput } from 'src/modules/tranche/dto/tranche.input';

@InputType()
export class AvanceTrancheCreateInput {
  // @Field(()=>ID,{nullable:true})
  // studentId?: string;

  @Field(()=>ID,{nullable:true})
  trancheId?: string;

  @Field(()=>ID,{nullable:true})
  trancheStudentId?:string

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;

  @Field({nullable:true})
  montant?: number;

  @Field({nullable:true,defaultValue:0})
  reste?: number;

  // @Field(()=>StudentCreateInput,{nullable:true})
  // student?:StudentCreateInput
  
  // @Field(()=>TrancheCreateInput, {nullable:true})
  // trancheStudent?:TrancheStudentCreateInput
}
