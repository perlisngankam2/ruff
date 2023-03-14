/* eslint-disable prettier/prettier */
import { Collection, Entity, IdentifiedReference, ManyToOne, OneToMany, Property, TimeType} from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PrimaryKeyUuid } from "src/decorators/PrimaryKeyUuid.decorator";
import { PersonnelSalle } from "./personnelsalle.entity";



@Entity()
@ObjectType()
export class Course{
@Field(()=>ID)
@PrimaryKeyUuid()
id!:string

@Field({nullable:true})
@Property({nullable:true})
title: string

@Field({nullable:true})
@Property({ nullable:true })
time!:string

@OneToMany(() => PersonnelSalle, (personnelsalle) => personnelsalle.course)
personnelsalle = new Collection<PersonnelSalle>(this); 

}