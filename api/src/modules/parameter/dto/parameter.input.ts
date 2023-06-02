/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ParameterCreateInput {
 
  @Field({nullable:true})
  ID?: string;

  @Field({nullable:true})
  parameterName?: string;

  @Field({nullable:true})
  phoneNumber?: string;

  @Field({nullable:true})
  emailAddress?: string;

  @Field({nullable:true})
  contry?: string;

  @Field({nullable:true})
  postalBox?: string;

  @Field({nullable:true})
  schoolCurrency?: string;

  @Field({nullable:true})
  year?: string;

  @Field({nullable:true})
  anneeAcademiqueId?: string;

}