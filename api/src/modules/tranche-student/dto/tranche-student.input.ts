/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { RegimePaiement } from 'src/entities/tranche-student.entity';
import { StudentCreateInput } from 'src/modules/student/dto/student.input';
import { TrancheCreateInput } from 'src/modules/tranche/dto/tranche.input';

@InputType()
export class TrancheStudentCreateInput {

  @Field(()=>ID,{nullable:true})
  studentId?:string

  // @Field(()=>ID,{nullable:true})
  // tranche_id?:string

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description!: string;

  @Field({nullable:true})
  montant?: number;

  // @Field(()=>RegimePaiement,{nullable:true})
  // regimePaiement?: RegimePaiement;

  // @Field(()=>StudentCreateInput,{nullable:true})
  // student?:StudentCreateInput
  
  // @Field(()=>TrancheCreateInput,{nullable:true})
  // tranche?:TrancheCreateInput
}
