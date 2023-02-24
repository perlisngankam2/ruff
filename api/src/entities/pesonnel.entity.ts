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
import { CategoriePersonnel } from './categorie-personnel.entity';
import { PrimePersonnel } from './prime-personnel.entity';
import { RetenuPersonnel } from './retenu-personnel.entity';
import { Salle } from './salle.entity';
import { User } from './user.entity';

import { Role } from './../modules/auth/roles/roles';

@Entity()
@ObjectType()
export class Personnel {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  firstName!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  lastName!: string;
  
  @Field({ nullable: true })
  @Property({ nullable: true })
  phoneNumber!: string;
  

  @Field({ nullable: true })
  @Property({ nullable: true })
  situationMatrimonial!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  sexe!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  fonction!: Role;

  @Field({ nullable: true })
  @Property({ nullable: true })
  status!: string;

  // @Field(() => Date, { nullable: true })
  // @Property({ nullable: true })
  // dateOfStartWork!:Date
  @Field({ defaultValue: false })
  @Property({ default: false })
  dateOfStartWork!: string;

  // @Field(() => Date, { nullable: true }) 
  // @Property({ nullable: true })
  // dateOfBirth!: Date

  @Field({ defaultValue: false })
  @Property({ default: false })
  dateOfBirth!: string;

  // @Field({ nullable: true })
  // @Property({ nullable: true })
  // matricule!: string;

  @Field({ nullable: true})
  @Property({ nullable: true })
  childNumber!: number;

  @Field({nullable: true})
  @Property({nullable: true})
  password!: string

  @Field({nullable:true})
  @Property({nullable:true})
  email!: string

  @Field({nullable: true})
  @Property({nullable: true})
  password!: string

  @Field({nullable:true})
  @Property({nullable:true})
  email!: string

  //Relation with another table 
  @OneToOne(() => User, (user) => user.personnel, {
    owner: true,
    unique: true,
    onDelete: 'CASCADE',
    nullable:true
  })
  user!: IdentifiedReference<User>;

  @ManyToOne(() => CategoriePersonnel ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  category!:IdentifiedReference<CategoriePersonnel>|null


// relation with another Entites
  @OneToMany(() => PrimePersonnel, prime => prime.personnel)
  prime = new Collection<PrimePersonnel>(this);

  @OneToMany(() => RetenuPersonnel, retenue => retenue.personnel)
  retenue = new Collection<RetenuPersonnel>(this);

  // only for categorie Teacher
  @ManyToOne(() => Salle ,{
    nullable:true,
    onDelete:'cascade'
  })
  salle!:IdentifiedReference<Salle>|null

}