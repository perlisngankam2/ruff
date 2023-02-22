/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { CycleCreateInput } from 'src/modules/cycle/dto/cycle.input';
import { SectionCreateInput } from 'src/modules/section/dto/section.input';

@InputType()
export class SectionCycleCreateInput {
  @Field({nullable:true})
  ID?: string

  @Field({nullable:true})
  nom?: string;

  // @Field({nullable:true})
  // description?: string;


  @Field(()=> ID,{nullable:true})
  cycle_id?: string;

  
  @Field(()=>ID,{nullable:true})
  section_id?: string;

  @Field(()=>CycleCreateInput,{nullable:true})
  cycle?:CycleCreateInput

  @Field(()=>SectionCreateInput,{nullable:true})
  section:SectionCreateInput

}
