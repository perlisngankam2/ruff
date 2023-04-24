/* eslint-disable prettier/prettier */

import { Entity, IdentifiedReference, ManyToOne, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PrimaryKeyUuid } from "src/decorators/PrimaryKeyUuid.decorator";
import { AnneeAccademique } from "./annee-accademique.entity";
import { Pension } from "./pension.entity";
import { Salaire } from "./salaire.entity";
import { Personnel } from "./pesonnel.entity";
import { Student } from "./student.entity";
import { format } from "date-fns";


@Entity()
@ObjectType()
export class Expense {
    @Field(() => ID)
    @PrimaryKeyUuid()
    id: string;
  
    @Field({ nullable: true })
    @Property({ nullable: true })
    creditamount: number;

    // @Field({ nullable: true })
    @Property({ onCreate: () => new Date() })
    createdAt = new Date();
  
    @Field({ nullable: true })
    @Property({ nullable: true })
    debitamount: number;
  
    @ManyToOne(() => Student ,{
      nullable:true,
      onDelete:'CASCADE',
    })
    student!:IdentifiedReference<Student>|null

    @ManyToOne(() => Personnel ,{
      nullable:true,
      onDelete:'CASCADE'
    })
    personnel!:IdentifiedReference<Personnel>|null


    @ManyToOne(() => AnneeAccademique ,{
      nullable:true,
      onDelete:'CASCADE'
    })
    anneeAccademique!:IdentifiedReference<AnneeAccademique>|null

    @Field(() => ID)
    @Property({ persist: false })
    get studentid() {
      return `${this.student.id}`;
    }

    @Field(() => ID)
    @Property({ persist: false })
    get personnelid() {
      return `${this.personnel.id}`;
    }

    @Field(() => String)
    @Property({ persist: false })
    get createdOn() {
      return `${this.createdAt}`;
    }
  }
  

  