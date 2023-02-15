/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { TypeRetenu } from 'src/entities/categorie-retenu.entity';
import { User } from 'src/entities/user.entity';
import { SectionCycleCreateInput } from 'src/modules/section-cycle/dto/section-cycle.input';
import { UserCreateInput } from 'src/modules/user/dto/user.input';

@InputType()
export class NiveauEtudeCreateInput {
  @Field(()=>ID,{nullable:true})
  sectioncycle_id?:string
  
  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;

  @Field(()=>SectionCycleCreateInput,{nullable:true})
  sectionCycle?:SectionCycleCreateInput
}