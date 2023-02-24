/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import {SectionCreateInput} from 'src/modules/section/dto/section.input';


@InputType()
export class CycleCreateInput {
  @Field({nullable:true})
  ID?: string;

  @Field({nullable:true})
  name?: string;

  @Field(()=>ID,{nullable:true})
  sectionId?:string

  // @Field(()=> SectionCreateInput, {nullable:true})
  // section?: SectionCreateInput

  // @Field({defaultValue:0})
  // effectif?: number;
}
