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
  name!: string;

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
  country!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  year!: string;
 
  @ManyToOne(() => AnneeAccademique, {
    nullable: true,
    // onDelete: "CASCADE"
  })
  anneeacademique!: IdentifiedReference<AnneeAccademique> | null;
}