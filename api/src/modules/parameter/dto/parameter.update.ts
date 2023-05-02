/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ParameterUpdateInput {
 
  @Field({nullable:true})
  ID?: string;
  
  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  phoneNumber?: string;

  @Field({nullable:true})
  emailAddress?: string;

  @Field({nullable:true})
  country?: string;

  @Field({nullable:true})
  postalBox?: string;

  @Field({nullable:true})
  year?: string;

  @Field({nullable:true})
  anneeAcademiqueId?: string;
}