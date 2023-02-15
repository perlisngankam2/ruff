/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { CategorieEleveCreateInput } from 'src/modules/categorie_eleve/dto/categorie-eleve.input';
import { InscriptionInput } from 'src/modules/inscription/dto/inscription.input';
import { LocalisationCreateInput } from 'src/modules/localisation/dto/localisation.input';
import { SalleCreateInput } from 'src/modules/salle/dto/salle.input';
import { UserCreateInput } from 'src/modules/user/dto/user.input';

@InputType()
export class StudentCreateInput {
  @Field(()=>ID, {nullable:true})
  categorie_id?: string

  @Field({nullable:true})
  matricule!: string;

  @Field({ nullable: true })
  firstname!: string;

  @Field({ nullable: true })
  lastname!: string;

  @Field({ nullable:true })
  date_of_birth!: string;

  @Field({ nullable: true })
  sex!: string;

  @Field({ nullable: true })
  class!: string;

  @Field({ nullable: true })
  adress!: string;

  @Field({ defaultValue: false })
  transport!: boolean;

  @Field({nullable:true})
  lastSchool!: string;

  @Field({defaultValue:false, nullable:true})
  exclut!: boolean;

  @Field(() =>CategorieEleveCreateInput,{nullable:true})
  categorie?: CategorieEleveCreateInput;

  // @Field({defaultValue:false})
  // old!: boolean;

  // @Field({nullable:true})
  // user!: UserCreateInput;

  // @Field({nullable:true})
  // salle!: SalleCreateInput;

  // @Field({nullable:true})
  // localisation!: LocalisationCreateInput;
  
}
