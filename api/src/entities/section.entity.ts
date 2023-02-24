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
import { Cycle } from './cycle.entity';
import { Salle } from './salle.entity';
import { SectionCycle } from './section-cycle.entity';

@Entity()
@ObjectType()
export class Section {
    @Field(() => ID)
    @PrimaryKeyUuid()
    id!: string;
  
    @Field({ nullable: true })
    @Property({nullable:true})
    name!: string;

    @Field({ nullable: true })
    @Property({nullable:true})
    description!: string;

    
    // @Field({ defaultValue: 0 })
    // @Property({default:0})
    // effectif!: number;

    @Property({ onCreate: () => new Date() })
    createdAt = new Date();

    @OneToMany(() => Cycle, (cycle) => cycle.section)
    cycle = new Collection<SectionCycle>(this);

}