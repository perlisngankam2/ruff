/* eslint-disable prettier/prettier */
import { SectionCycleUpdateInput } from './../../section-cycle/dto/section-cycle.update';
import { Field, ID, InputType } from '@nestjs/graphql';
import { TypeRetenu } from 'src/entities/categorie-retenu.entity';
import { User } from 'src/entities/user.entity';
import { SectionCycleCreateInput } from 'src/modules/section-cycle/dto/section-cycle.input';
import { UserCreateInput } from 'src/modules/user/dto/user.input';

@InputType()
export class NiveauEtudeUpdateInput {
 
   
  @Field({nullable:true})
  ID?: string;
  
  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string
  
  // @Field(()=>ID,{nullable:true})
  // salle?: string;

  // @Field(()=>ID,{nullable:true})
  // cycle?: string;

  @Field({nullable:true})
  montantPension?: number;

  @Field(()=>SectionCycleCreateInput,{nullable:true})
  sectionCycle?:SectionCycleCreateInput
}