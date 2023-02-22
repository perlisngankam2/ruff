/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    Enum,
    IdentifiedReference,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryKey,
    Property,
  } from '@mikro-orm/core';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PrimaryKeyUuid } from '../decorators/PrimaryKeyUuid.decorator';
import { NiveauEtude } from './niveau-etude.entity';
import { SectionCycle } from './section-cycle.entity';
import { Section } from './section.entity';


@Entity()
@ObjectType()
export class Cycle{
    @Field(() => ID)
    @PrimaryKeyUuid()
    id!: string;
  
    @Field({ nullable: true })
    @Property({nullable:true})
    name!: string;

    @Property({ onCreate: () => new Date() })
    createdAt = new Date();

    @ManyToOne(() => NiveauEtude, {
      nullable: true,
      onDelete: 'CASCADE',
    })
    niveau!: IdentifiedReference<NiveauEtude> | null;

    @ManyToOne(() => Section, {
      nullable: true,
      onDelete: 'CASCADE',
    })
    section!: IdentifiedReference<Section> | null;
   }