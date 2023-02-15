/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CycleCreateInput {
  @Field({nullable:true})
  ID?: string;

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  section:string

  // @Field({defaultValue:0})
  // effectif?: number;
}
