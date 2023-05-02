/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';



@InputType()
export class ExpenseCreateInput {
  @Field(()=>ID,{nullable:true})
  academicyearId!: string;

  @Field(()=>ID,{nullable:true})
  studentId!: string;

  @Field(()=>ID,{nullable:true})
  personnelId!: string;

  @Field({nullable:true})
  debit!: number;

  @Field({nullable:true})
  credit!: number;

  @Field({nullable:true})
  debitTotal!: number;

  @Field({nullable:true})
  creditTotal!: number;

}