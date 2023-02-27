/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';



@InputType()
export class ExpenseCreateInput {
  @Field(()=>ID,{nullable:true})
  academicyearId!: string;

  @Field({nullable:true})
  title!: string;

  @Field({nullable:true})
  amount!: number;

  @Field({nullable:true})
  description!: string;

}