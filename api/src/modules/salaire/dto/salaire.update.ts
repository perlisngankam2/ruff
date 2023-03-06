/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { Periode } from 'src/entities/periode.entity';
import { Prime } from 'src/entities/prime.entity';
import { Retenue } from 'src/entities/retenu-salaire.entity';
import { PeriodeUpdateInput } from 'src/modules/periode/dto/periode.update';
import { PersonnelUpdateInput } from 'src/modules/personnel/dto/personnel.update';
import { PrimePersonnelUpdateInput } from 'src/modules/prime_personnel/dto/prime-personnel.update';
import { RetenuPersonnelUpdateInput } from 'src/modules/retenu_personnel/dto/retenu-personnel.update';

@InputType()
export class SalaireUpdateInput {
  @Field(()=>ID,{ nullable: true })
  periodeId:string

  @Field(()=>ID,{ nullable: true })
  personnelId:string

  @Field(()=>ID,{ nullable: true })
  primeId:string

  @Field(()=>ID,{ nullable: true })
  retenuId:string

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:false})
  payer?: boolean;

  @Field({defaultValue:0})
  montant?: number;

  @Field(()=>PeriodeUpdateInput,{nullable:true})
  periode?: PeriodeUpdateInput;

  @Field(()=>PersonnelUpdateInput,{nullable:true})
  personnel?: PersonnelUpdateInput;

  @Field(()=>PrimePersonnelUpdateInput,{nullable:true})
  prime?: PrimePersonnelUpdateInput;

  @Field(()=>RetenuPersonnelUpdateInput,{nullable:true})
  retenu?:RetenuPersonnelUpdateInput;

}
