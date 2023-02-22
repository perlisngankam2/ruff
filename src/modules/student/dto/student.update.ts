/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { CategorieEleveCreateInput } from 'src/modules/categorie_eleve/dto/categorie-eleve.input';
import { InscriptionInput } from 'src/modules/inscription/dto/inscription.input';
import { LocalisationCreateInput } from 'src/modules/localisation/dto/localisation.input';
import { SalleCreateInput } from 'src/modules/salle/dto/salle.input';
import { UserCreateInput } from 'src/modules/user/dto/user.input';

@InputType()
export class StudentUpdateInput {
  @Field({nullable:true})
  ID!: string;

  @Field({nullable:true})
  matricule!: string;

  @Field({ nullable: true })
  firstname!: string;

  @Field({ nullable: true })
  lastname!: string;

  @Field({ nullable:true })
  dateOfBirth!: string;

  @Field({ nullable: true })
  sex!: string;

  @Field({ nullable: true })
  classe!: string;

  @Field({ nullable: true })
  adress!: string;

  @Field({ nullable: true })
  transport!: string;

  // @Field({defaultValue:true})
  // old!: boolean;

   @Field({nullable:true})
  categoryStudent!: string;

  @Field({nullable:true})
  section!: string;
  
  @Field({nullable:true})
  cycle!: string;

  @Field({nullable:true})
  fatherFirstName!: string;

  @Field({nullable:true})
  fatherLastName!: string;

  @Field({nullable:true})
  fatherPhoneNumber!: string;

  @Field({nullable:true})
  fatherProfession!: string;

  @Field({nullable:true})
  motherFirstName!: string;

  @Field({nullable:true})
  motherLastName!: string;

  @Field({nullable:true})
  motherPhoneNumber!: string;

  @Field({nullable:true})
  motherProfession!: string;

  @Field({nullable:true})
  tutorFirstName!: string;

  @Field({nullable:true})
  tutorLastName!: string;

   @Field({nullable:true})
  tutorPhoneNumber!: string;

   @Field({nullable:true})
  tutorProfession!: string;

  // @Field({nullable:true})
  // salle!: string;

  // @Field({nullable:true})
  // lastSchool!: string;

  // @Field({defaultValue:false})
  // exclut!: boolean;

  // @Field({nullable:true})
  // user!: UserCreateInput;

  // @Field({nullable:true})
  // categorie!: CategorieEleveCreateInput;

  // @Field({nullable:true})
  // localisation!: LocalisationCreateInput;

}
