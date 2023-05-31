/* eslint-disable prettier/prettier */
import { Entity, IdentifiedReference, ManyToOne, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PrimaryKeyUuid } from "src/decorators/PrimaryKeyUuid.decorator";
import { AnneeAccademique } from "./annee-accademique.entity";

@Entity()
@ObjectType()
export class Parameter {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  parameterName!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  postalBox!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  phoneNumber!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  emailAddress!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  contry!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  schoolCurrency!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  year!: string;
 
  @ManyToOne(() => AnneeAccademique, {
    nullable: false,
    // onDelete: "CASCADE"
  })
  anneeacademique!: IdentifiedReference<AnneeAccademique> | null;
 

  @Field(() => ID, {nullable: true})
  @Property({ persist: false })
    get anneeAcademiqueId() {
    return this.anneeacademique?`${this.anneeacademique.id}`:null;
  }

  @Field(() => ID, {nullable: true})
  @Property({ persist: false })
    get anneeAcademiqueName() {
    return this.anneeacademique?`${this.anneeacademique.getEntity().name}`:null;
  }

}