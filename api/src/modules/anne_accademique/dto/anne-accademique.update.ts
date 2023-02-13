/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AnneeAccademiqueCreateInput {
  @Field({nullable:true})
  ID?: string;

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;

  @Field(()=>Date,{nullable:true})
  anneeAccademique?:Date;

}
