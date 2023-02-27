/* eslint-disable prettier/prettier */

import { Entity, IdentifiedReference, ManyToOne, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PrimaryKeyUuid } from "src/decorators/PrimaryKeyUuid.decorator";
import { AnneeAccademique } from "./annee-accademique.entity";


@Entity()
@ObjectType()
export class Expense {
    @Field(() => ID)
    @PrimaryKeyUuid()
    id: string;
  
    @Field({ nullable: true })
    @Property({ nullable: true })
    title: string;
  
    @Field({ nullable: true })
    @Property({ nullable: true })
    amount: number;
  
    @Field({ nullable: true })
    @Property({ nullable: true })
    description: string;

    @ManyToOne(() => AnneeAccademique ,{
      nullable:true,
      onDelete:'CASCADE'
    })
    anneeAccademique!:IdentifiedReference<AnneeAccademique>|null
  }
  

  