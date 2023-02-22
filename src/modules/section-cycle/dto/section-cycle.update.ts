/* eslint-disable prettier/prettier */
import { CycleUpdateInput } from './../../cycle/dto/cycle.update';
/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { Periode } from 'src/entities/periode.entity';
import { Prime } from 'src/entities/prime.entity';
import { Retenue } from 'src/entities/retenu-salaire.entity';
import { CategoriePersonnelCreateInput } from 'src/modules/categorie_personnel/dto/categorie-personnel.input';
import { CycleCreateInput } from 'src/modules/cycle/dto/cycle.input';
import { PeriodeCreateInput } from 'src/modules/periode/dto/periode.input';
import { PersonnelCreateInput } from 'src/modules/personnel/dto/personnel.input';
import { PrimeCreateInput } from 'src/modules/prime/dto/prime.input';
import { PrimePersonnelCreateInput } from 'src/modules/prime_personnel/dto/prime-personnel.input';
import { RetenuPersonnelCreateInput } from 'src/modules/retenu_personnel/dto/retenu-personnel.input';
import { SectionCreateInput } from 'src/modules/section/dto/section.input';
import { SectionUpdateInput } from 'src/modules/section/dto/section.update';

@InputType()
export class SectionCycleUpdateInput {
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
  cycle?:CycleUpdateInput

  @Field(()=>SectionCreateInput,{nullable:true})
  section:SectionUpdateInput
}
