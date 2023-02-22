/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import {SectionUpdateInput} from 'src/modules/section/dto/section.update';

@InputType()
export class CycleUpdateInput {
  @Field({nullable:true})
  ID?: string;

  @Field({nullable:true})
  name?: string;

  @Field(()=>ID,{nullable:true})
  sectionId?: string;

  // @Field(()=> SectionUpdateInput, {nullable:true})
  // section?: SectionUpdateInput

  // @Field({defaultValue:0})
  // effectif?: number;  

}