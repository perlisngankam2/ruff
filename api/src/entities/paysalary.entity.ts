/* eslint-disable prettier/prettier */
import { Collection, Entity, IdentifiedReference, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Personnel } from "./pesonnel.entity";
import { PrimePersonnel } from "./prime-personnel.entity";
import { RetenuPersonnel } from "./retenu-personnel.entity";
import { format } from "date-fns";
import { PrimaryKeyUuid } from "src/decorators/PrimaryKeyUuid.decorator";


@Entity()
@ObjectType()
export class PaySalary {
@PrimaryKeyUuid()
@Field(() => ID)
id!: string;

@Field({ nullable: true })
@Property({ nullable: true })
moisPaie!: string;

@Property({ onCreate: () => new Date() })
createdAt = format(new Date(),'HH:mm:ss');

@Field({ defaultValue: 0 })
@Property({ default: 0 })
montant!: number ;

@ManyToOne(() => Personnel ,{
  nullable:false,
  onDelete:'CASCADE',
})
personnel!:IdentifiedReference<Personnel>|null

@Field(() => ID)
@Property({ persist: false })
get personnelid() {
  return `${this.personnel.id}`;
}

@OneToMany(() => PrimePersonnel, primePersonel => primePersonel.paysalary)
primePersonnel = new Collection<PrimePersonnel>(this);

@OneToMany(() => RetenuPersonnel, retenuPernole => retenuPernole.paysalary)
retenuPersonnel = new Collection<RetenuPersonnel>(this);

}