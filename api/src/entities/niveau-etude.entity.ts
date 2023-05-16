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
    PrimaryKeyType,
    Property,
  } from '@mikro-orm/core';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PrimaryKeyUuid } from '../decorators/PrimaryKeyUuid.decorator';
import { FraisExamen } from './frais-exament.entity';
import { FraisInscription } from './frais-inscription.entity';
import { Pension } from './pension.entity';
import { Salle } from './salle.entity';
import { SectionCycle } from './section-cycle.entity';
import { Cycle} from './cycle.entity';


@Entity()
@ObjectType()
export class NiveauEtude{
    @Field(() => ID)
    @PrimaryKeyUuid()
    id!: string;
  
  
    @Field({ nullable: true })
    @Property({nullable:true})
    name!: string;

    @Field({ nullable: true })
    @Property({nullable:true})
    description!: string;

    // @Field({ nullable: true })
    // @Property({nullable:true})
    // section!: string;

    // @Field({ nullable: true })
    // @Property({nullable:true})
    // cycle!: string;

    @Field({nullable: true})
    @Property({nullable: true})
    montantPension!: number;

    @Property({ onCreate: () => new Date() })
    createdAt = new Date();

// relation entities
  // @OneToOne(() => Pension, (pension) => pension.niveauEtude, {
  //     owner: false,
  //     nullable: true,
  //   })
  // pension!: IdentifiedReference<Pension> | null;

  // @OneToOne(() => FraisExamen, (fraisExamen) => fraisExamen.niveauEtude, {
  //     owner: false,
  //     nullable: true,
  //   })
  // fraisExamen!: IdentifiedReference<FraisExamen> | null;

  // @OneToOne(() => FraisInscription, (fraisInscription) => fraisInscription.niveauEtude, {
  //     owner: false,
  //   })
  // fraisInscription!: IdentifiedReference<FraisInscription> | null;
  @ManyToOne(() => Cycle, {
    nullable: true,
    onDelete: 'CASCADE',
    eager:true
  })
  cycle!: IdentifiedReference<Cycle> | null;

  @OneToMany(() => Salle, (salle) => salle.niveau)
  salle = new Collection<Salle>(this);


  @Field(() => ID, {nullable: true})
  @Property({ persist: false })
    get cycleid() {
    return this.cycle?`${this.cycle.id}`:null;
}

    @Field(() => ID, {nullable: true})
  @Property({ persist: false })
  get cycleName() {
  return this.cycle?`${this.cycle.getEntity().name}`:null;
}

}