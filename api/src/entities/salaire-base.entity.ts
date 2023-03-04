/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    Enum,
    Filter,
    IdentifiedReference,
    ManyToMany,
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


@Entity()
@ObjectType()
export class SalaireBase {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description!: string;

  @Field({ defaultValue: 0 })
  @Property({ default: 0 })
  montant!: number ;
  
// relation with another Entites
  @OneToMany(() => CategoriePersonnel, categorie => categorie.salaireBase)
  categoriePersonnel = new Collection<CategoriePersonnel>(this);
  
  // @ManyToMany(() => CategoriePersonnel, categoriePersonnel => categoriePersonnel.salairebase)
  // categoriePersonnel = new Collection<CategoriePersonnel>(this);
}