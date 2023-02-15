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
import { CategorieEleve } from './categorie-eleve.entity';


@Entity()
@ObjectType()
export class ReductionScolarite {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description!: string;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Field({nullable:true})
  @Property({nullable:true})
  montant!: number;

  @Field({ nullable:true})
  @Property({ nullable:true})
  pourcentage!: number;

  @OneToMany(()=>CategorieEleve, (categorie) => categorie.reductionScolarite)
  categorie = new Collection<CategorieEleve>(this)
}