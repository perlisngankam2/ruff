/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { CategoriePrimeCreateInput } from 'src/modules/categorie_prime/dto/categorie-prime.input';
import { PersonnelCreateInput } from 'src/modules/personnel/dto/personnel.input';
import { PrimeCreateInput } from 'src/modules/prime/dto/prime.input';

@InputType()
export class PrimePersonnelUpdateInput {
  @Field(()=>ID,{nullable:true})
  primeID?: string;

  @Field(()=>ID,{nullable:true})
  personnelID?: string;

  @Field(()=>PrimeCreateInput,{nullable:true})
  prime?:PrimeCreateInput;

  @Field(()=>PersonnelCreateInput,{nullable:true})
  personnel?:PersonnelCreateInput
}
