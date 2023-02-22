/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    Enum,
    IdentifiedReference,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryKey,
    Property,
  } from '@mikro-orm/core';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PrimaryKeyUuid } from '../decorators/PrimaryKeyUuid.decorator';

@Entity()
@ObjectType()
export class Localisation {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({nullable:true})
  ville!: string;

  @Field({ nullable: true })
  @Property({nullable:true})
  region!: string;

  @Field({ nullable: true })
  @Property({nullable:true})
  pays!: string;

  @Field({ nullable: true })
  @Property({nullable:true})
  quartier!: string;

  @Field({ defaultValue:0 })
  @Property({default:0})
  longitude!: number;

  @Field({ defaultValue:0 })
  @Property({default:0})
  latitude!: number;

  @Field({ nullable: true })
  @Property({nullable:true})
  bp!: string;

  @Property({ onCreate: () => new Date() })
  created = new Date();
}