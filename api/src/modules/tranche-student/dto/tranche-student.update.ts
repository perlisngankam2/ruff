/* eslint-disable prettier/prettier */
import { TrancheUpdateInput } from './../../tranche/dto/tranche.update';
import { Field, ID, InputType } from '@nestjs/graphql';
import { RegimePaiement } from 'src/entities/tranche-student.entity';
import { AnneeAccademiqueCreateInput } from 'src/modules/anne_accademique/dto/anne-accademique.update';
import { CategoriePrimeCreateInput } from 'src/modules/categorie_prime/dto/categorie-prime.input';
import { PensionCreateInput } from 'src/modules/pension/dto/pension.input';
import { SalleCreateInput } from 'src/modules/salle/dto/salle.input';
import { StudentCreateInput } from 'src/modules/student/dto/student.input';
import { TrancheCreateInput } from 'src/modules/tranche/dto/tranche.input';

@InputType()
export class TrancheStudentUpdateInput {
  @Field({nullable:true})
  ID?: string;

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description!: string;

  @Field()
  regimePaimemnt!: RegimePaiement;

  @Field({nullable:true,defaultValue:0})
  montant?: number;

  @Field({nullable:true})
  student?:StudentCreateInput
  
  @Field({nullable:true})
  tranche?:TrancheUpdateInput
}
