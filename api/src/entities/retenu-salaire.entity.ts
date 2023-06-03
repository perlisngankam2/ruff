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
import { CategorieRetenu } from './categorie-retenu.entity';
import { RetenuPersonnel } from './retenu-personnel.entity';


@Entity()
@ObjectType()
export class Retenue {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({ unique: true })
  nom!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description!: string;

  @Field({ defaultValue:0 })
  @Property({ default:0 })
  montant!: number;

// relation with another Entites
  @OneToMany(() => RetenuPersonnel, retenu_personnel => retenu_personnel.retenue)
  retenuPersonnel = new Collection<RetenuPersonnel>(this);
  
  @OneToMany(() => CategoriePersonnel, categorie_personnel => categorie_personnel.retenu)
  categoriePersonnel = new Collection<CategoriePersonnel>(this);

  @ManyToOne(() => CategorieRetenu ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  categorieRetenu!:IdentifiedReference<CategorieRetenu>|null

}