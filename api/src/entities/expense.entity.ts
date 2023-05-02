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

  
    @Property({ onCreate: () => new Date() })
    createdAt = new Date();
  
    @Field({ nullable: true })
    @Property({ nullable: true })
    debitamount: number;

    @Field({ nullable: true })
    @Property({ nullable: true })
    debitTotal: number;

    @Field({ nullable: true })
    @Property({ nullable: true })
    creditTotal: number;
  
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
    get studentid():string|null {
      return this.student? `${this.student.id}` : null;
    }

    @Field(() => ID, { nullable: true })
    @Property({ persist: false })
    get personnelid(): string | null {
      return this.personnel? `${this.personnel.id}` : null;
    }

    @Field(() => ID, { nullable: true })
    @Property({ persist: false })
    get personnelName(): string | null {
      return this.personnel? `${this.personnel.getEntity().lastName}` : null;
    }

    @Field(() => ID, { nullable: true })
    @Property({ persist: false })
    get personnelSurName(): string | null {
      return this.personnel? `${this.personnel.getEntity().firstName}` : null;
    }

    @Field(() => ID, { nullable: true })
    @Property({ persist: false })
    get personnelFunction(): string | null {
      return this.personnel? `${this.personnel.getEntity().fonction}` : null;
    }

    @Field(() => ID)
    @Property({ persist: false })
    get studentLastname() {
      return this.student? `${this.student.getEntity().lastname})` : null;
    }

    @Field(() => ID)
    @Property({ persist: false })
    get studentSurname() {
      return this.student? `${this.student.getEntity().firstname}` : null;
    }

    @Field(() => String)
    @Property({ persist: false })
    get createdOn() {
      return `${this.createdAt}`;
    }
  }
  

  