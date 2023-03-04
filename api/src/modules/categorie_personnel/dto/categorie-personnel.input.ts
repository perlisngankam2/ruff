/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { PrimeCreateInput } from 'src/modules/prime/dto/prime.input';
import { RetenuCreateInput } from 'src/modules/retenu_salarial/dto/retenu.input';
import { SalaireBaseCreateInput } from 'src/modules/salaire_base/dto/salaire-base.input';
import { UserCreateInput } from 'src/modules/user/dto/user.input';

@InputType()
export class CategoriePersonnelCreateInput {
  // @Field(()=>ID,{nullable:true})
  // primeID?: string;

  // @Field(()=>ID,{nullable:true})
  // retenuID?: string;

  // @Field(()=>ID,{nullable:true})
  // salaireID?: string;

  @Field({nullable:true})
  nom?: string;

  @Field({nullable:true})
  description?: string;
  
  // @Field(()=>PrimeCreateInput,{nullable:true})
  // prime?: PrimeCreateInput;

  // @Field(()=>RetenuCreateInput,{nullable:true})
  // retenu?: RetenuCreateInput;

  // @Field(()=>SalaireBaseCreateInput,{nullable:true})
  // salaireBase?: SalaireBaseCreateInput;
  
}
