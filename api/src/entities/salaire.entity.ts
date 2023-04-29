/* eslint-disable prettier/prettier */
import {
  Collection,
  Entity,
  Enum,
  Filter,
  IdentifiedReference,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryKeyUuid } from '../decorators/PrimaryKeyUuid.decorator';
import { Periode } from './periode.entity';
import { Personnel } from './pesonnel.entity';
import { PrimePersonnel } from './prime-personnel.entity';
import { RetenuPersonnel } from './retenu-personnel.entity';
import { format } from 'date-fns';
import { Expense } from './expense.entity';


@Entity()
@ObjectType()
export class Salaire {
@PrimaryKeyUuid()
@Field(() => ID)
id!: string;

// @Field({ nullable: true })
// @Property({ nullable: true })
// description!: string;

@Field({ nullable: true })
@Property({ nullable: true })
jourPaie!: string;

@Field({ nullable: true })
@Property({ nullable: true })
moisPaie!: string;

@Property({ onCreate: () => new Date() })
createdAt = format(new Date(),'HH:mm:ss');

@Field({ defaultValue: true })
@Property({ default: true })
payer!: boolean;

@Field({ defaultValue: 0 })
@Property({ default: 0 })
montant!: number ;

// relation with another Entites
@ManyToOne(() => Periode ,{
  nullable:true,
  onDelete:'CASCADE'
})
periode!:IdentifiedReference<Periode>|null

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

   @Field(() => ID, { nullable: true })
    @Property({ persist: false })
    get personnelFirstName(): string | null {
      return this.personnel ? `${this.personnel.getEntity().firstName}` : null;
    }

    @Field(() => ID, { nullable: true })
    @Property({ persist: false })
    get personnelLastName(): string | null {
      return this.personnel ? `${this.personnel.getEntity().lastName}` : null;
    }

    @Field(() => ID, { nullable: true })
    @Property({ persist: false })
    get personnelFonction(): string | null {
      return this.personnel ? `${this.personnel.getEntity().fonction}` : null;
    }

@OneToMany(() => PrimePersonnel, primePersonel => primePersonel.salaire)
primePersonnel = new Collection<PrimePersonnel>(this);

@OneToMany(() => RetenuPersonnel, retenuPernole => retenuPernole.salaire)
retenuPersonnel = new Collection<RetenuPersonnel>(this);



// @ManyToOne(() => RetenuPersonnel ,{
//   nullable:false,
//   onDelete:'SET NULL'
// })
// retenuPersonnel!:IdentifiedReference<RetenuPersonnel>|null
}