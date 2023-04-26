/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';


@InputType()
export class PaySalaryUpdateInput {

  @Field(()=>ID,{ nullable: true })
  personnelId:string

  @Field({defaultValue:0})
  montant?: number;

  @Field({nullable:true})
  moisPaie?: string;

}