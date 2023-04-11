/* eslint-disable prettier/prettier */
import {
  Collection,
    Entity,
    OneToMany,
    Property,
  } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryKeyUuid } from '../decorators/PrimaryKeyUuid.decorator';
import { Tranche } from './tranche.entity';

@Entity()
@ObjectType()
export class TranchePriority{
    @Field(() => ID)
    @PrimaryKeyUuid()
    id!: string;
  
    @Field({ nullable: true })
    @Property({nullable:true})
    name!: string;

    @Field({ nullable: true })
    @Property({nullable:true})
    description!: string;

    @OneToMany(()=>Tranche, (tranche) => tranche.tranchepriority)
    tranche = new Collection<Tranche>(this)
}