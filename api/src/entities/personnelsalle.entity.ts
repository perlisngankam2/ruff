/* eslint-disable prettier/prettier */
import { Entity, IdentifiedReference, ManyToOne, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PrimaryKeyUuid } from "src/decorators/PrimaryKeyUuid.decorator";
import { Course } from "./course.entity";
import { Personnel } from "./pesonnel.entity";
import { Salle } from "./salle.entity";

@Entity()
@ObjectType()
export class PersonnelSalle {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @ManyToOne(() => Personnel ,{
    nullable:false,
    onDelete:'CASCADE',
    // unique: true
  })
  personnel!:IdentifiedReference<Personnel>|null

  @ManyToOne(() => Salle ,{
    nullable:true,
    onDelete:'CASCADE',
    // unique:true
  })
  salle!:IdentifiedReference<Salle>|null

  @ManyToOne(() => Course ,{
    nullable:false,
    onDelete:'CASCADE',
    // unique: true
  })
  course!:IdentifiedReference<Course>|null

  @Field(() => ID)
  @Property({ persist: false })
  get personnelid() {
    return `${this.personnel.id}`;
  }

  @Field(() => ID)
  @Property({ persist: false })
  get salleid() {
    return `${this.salle.id}`;
  }

  @Field(() => ID)
  @Property({ persist: false })
  get courseid() {
    return `${this.course.id}`;
  }

}