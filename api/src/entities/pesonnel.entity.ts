/* eslint-disable prettier/prettier */
import {
  Collection,
    DateType,
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
import { Role } from 'src/modules/auth/roles/roles';
import { PrimaryKeyUuid } from '../decorators/PrimaryKeyUuid.decorator';
import { CategoriePersonnel } from './categorie-personnel.entity';
import { PrimePersonnel } from './prime-personnel.entity';
import { RetenuPersonnel } from './retenu-personnel.entity';
import { Salle } from './salle.entity';
import { User } from './user.entity';


@Entity()
@ObjectType()
export class Personnel {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;
  
  @Field({ nullable: true })
  @Property({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  surname!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  Matrimonialstatus!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  sexe!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  fonction!: Role

  @Field({ nullable: true })
  @Property({ nullable: true })
  status!: string;

  
  @Field(() => Date, { nullable: true })
  @Property({ nullable: true })
  dateOfStartWork= new Date()

  @Field(() => Date,{ nullable: true })
  @Property({ nullable: true })
  dateOfBirth= new Date()

  @Field({ nullable: true })
  @Property({ nullable: true })
  Email_address!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  telephone_number!: string;

  @Field({ defaultValue: 0 })
  @Property({ default: 0 })
  childNumber!: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  salary!: number;

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
  categorie!:IdentifiedReference<CategoriePersonnel>|null

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