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
import { Salle } from './salle.entity';


@Entity()
@ObjectType()
export class Cycle{
    @Field(() => ID)
    @PrimaryKeyUuid()
    id!: string;
  
    @Field({ nullable: true })
    @Property({unique:true})
    name!: string;

    @Property({ onCreate: () => new Date() })
    createdAt = new Date();

    @OneToMany(() => NiveauEtude, (niveauEtude) => niveauEtude.cycle)
    niveauEtude = new Collection<NiveauEtude>(this); 

    @OneToMany(() => Salle, (salle) => salle.cycle)
    salle = new Collection<Salle>(this); 

    @ManyToOne(() => Section, {
      nullable: true,
      onDelete: 'CASCADE',
    })
    section!: IdentifiedReference<Section> | null;

    @Field(() => ID)
    @Property({ persist: false })
    get sectionid():string|null {
      return this.section? `${this.section.id}`:null;
    }

    
    @Field(()=>ID)
    @Property({ persist: false })
    get sectionName():string|null {
      return this.section?`${this.section.getEntity().name}`:null;
    }
   }