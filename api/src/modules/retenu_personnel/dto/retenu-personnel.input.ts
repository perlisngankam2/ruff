/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { PersonnelCreateInput } from 'src/modules/personnel/dto/personnel.input';
import { RetenuCreateInput } from 'src/modules/retenu_salarial/dto/retenu.input';

@InputType()
export class RetenuPersonnelCreateInput {
  @Field({nullable:true})
  ID?: string;

  @Field()
  retenu?:RetenuCreateInput;

  @Field()
  personnnel?:PersonnelCreateInput
}
