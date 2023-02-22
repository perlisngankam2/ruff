/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { PensionCreateInput } from 'src/modules/pension/dto/pension.input';

@InputType()
export class TrancheCreateInput {
  @Field({nullable:true})
  ID?: string;

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;


  @Field({nullable:true})
  montant?: number;

  @Field({})
  dateLine?: Date;

  @Field()
  pension?:PensionCreateInput
}
