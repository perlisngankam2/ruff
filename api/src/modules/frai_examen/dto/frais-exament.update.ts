/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { AnneeAccademiqueCreateInput } from 'src/modules/anne_accademique/dto/anne-accademique.update';
import { CategoriePrimeCreateInput } from 'src/modules/categorie_prime/dto/categorie-prime.input';
import { NiveauEtudeCreateInput } from 'src/modules/niveau_etude/dto/niveau-etude.input';
import { SalleCreateInput } from 'src/modules/salle/dto/salle.input';
import { SalleUpdateInput } from 'src/modules/salle/dto/salle.update';

@InputType()
export class UpdateFraisExamentInput {
  @Field({nullable:true})
  ID?:  string;

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:0})
  montant?: number;

  @Field({})
  dateLine?: Date;

//   @Field()
//   niveauEtude?:NiveauEtudeCreateInput

  @Field()
  salle?:SalleUpdateInput

  @Field()
  anneeAccademique?:AnneeAccademiqueCreateInput
}
