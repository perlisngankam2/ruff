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

  
  @Field(() => ID, { nullable: true })
  @Property({ persist: false })
  get personnelId(): string | null {
    return this.personnel? `${this.personnel.id}` : null;
  }

    @Field(() => ID, { nullable: true })
    @Property({ persist: false })
    get personnelFirstName(): string | null {
      return this.personnel? `${this.personnel.getEntity().firstName}` : null;
    }
    
    @Field(() => ID, { nullable: true })
    @Property({ persist: false })
    get personnelLastName(): string | null {
      return this.personnel? `${this.personnel.getEntity().lastName}` : null;
    }

  @Field(() => ID, { nullable: true })
    @Property({ persist: false })
    get personnelFunction(): string | null {
      return this.personnel? `${this.personnel.getEntity().fonction}` : null;
  }

  @Field(() => ID, { nullable: true })
  @Property({ persist: false })
  get salleId(): string | null {
    return  this.salle? `${this.salle.id}`:null;
  }

  
  @Field(() => ID, { nullable: true })
  @Property({ persist: false })
  get salleName(): string | null {
    return this.salle? `${this.salle.getEntity().name}` : null;
  }

  // @Field(() => ID, { nullable: true })
  // @Property({ persist: false })
  // get personnelFirstName(): string | null {
  //   return this.personnel ? `${this.personnel.getEntity().firstName}` : null;
  // }

  // @Field(() => ID, { nullable: true })
  // @Property({ persist: false })
  // get personnelLastName(): string | null {
  //   return this.personnel ? `${this.personnel.getEntity().lastName}` : null;
  // }

  // @Field(() => ID, { nullable: true })
  // @Property({ persist: false })
  // get personnelFonction(): string | null {
  //   return this.personnel ? `${this.personnel.getEntity().fonction}` : null;
  // }

  @Field(() => ID, { nullable: true })
  @Property({ persist: false })
  get courseId(): string|null {
    return this.course? `${this.course.id}`:null;
  }

  @Field(() => ID, { nullable: true })
  @Property({ persist: false })
  get courseName(): string | null {
    return this.course? `${this.course.getEntity().title}` : null;

  }


}