/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { Periode } from 'src/entities/periode.entity';
import { Prime } from 'src/entities/prime.entity';
import { Retenue } from 'src/entities/retenu-salaire.entity';
import { CategoriePersonnelCreateInput } from 'src/modules/categorie_personnel/dto/categorie-personnel.input';
import { PeriodeCreateInput } from 'src/modules/periode/dto/periode.input';
import { PersonnelCreateInput } from 'src/modules/personnel/dto/personnel.input';
import { PrimeCreateInput } from 'src/modules/prime/dto/prime.input';
import { PrimePersonnelCreateInput } from 'src/modules/prime_personnel/dto/prime-personnel.input';
import { RetenuPersonnelCreateInput } from 'src/modules/retenu_personnel/dto/retenu-personnel.input';
import { RetenuCreateInput } from 'src/modules/retenu_salarial/dto/retenu.input';

@InputType()
export class SalaireCreateInput {
  // @Field(()=>ID,{ nullable: true })
  // periodeId:string

  @Field(()=>ID,{ nullable: true })
  personnelId:string

  @Field(()=>ID,{ nullable: true })
  primeId:string

  @Field(()=>ID,{ nullable: true })
  retenuId:string

  // @Field({nullable:true})
  // description?: string;

  @Field({defaultValue:false})
  payer?: boolean;

  @Field({defaultValue:0})
  montant?: number;

  @Field({nullable:true})
  jourPaie?: string;

  @Field({nullable:true})
  moisPaie?: string;

 

  @Field(()=>PeriodeCreateInput,{nullable:true})
  periode?: PeriodeCreateInput;

  @Field(()=>PersonnelCreateInput,{nullable:true})
  personnel?: PersonnelCreateInput;

  @Field(()=>PrimePersonnelCreateInput,{nullable:true})
  prime?: PrimePersonnelCreateInput;

  @Field(()=>RetenuPersonnelCreateInput,{nullable:true})
  retenu?: RetenuPersonnelCreateInput;

}
