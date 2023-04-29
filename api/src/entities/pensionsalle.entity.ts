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
  } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryKeyUuid } from '../decorators/PrimaryKeyUuid.decorator';
import { AnneeAccademique } from './annee-accademique.entity';
import { Salle } from './salle.entity';
import { Tranche } from './tranche.entity';


@Entity()
@ObjectType()
export class PensionSalle {
  
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description!: string;

  @Field({ defaultValue:0 })
  @Property({ default:0 })
  montantPension!: number;

  @Field(() => Date, { nullable: true })
  @Property({ nullable: true })
  dateLine!: Date | null;

// relation with another Entites
  @ManyToOne(() => Salle, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  salle!: IdentifiedReference<Salle> | null;

  @OneToMany(() => Tranche, tranche => tranche.pensionsalle)
  tranche = new Collection<Tranche>(this);

  @ManyToOne(() => AnneeAccademique ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  anneeAccademique!:IdentifiedReference<AnneeAccademique>|null

  @Field(() => ID)
  @Property({ persist: false })
  get yearid(): string | null {
    return this.anneeAccademique? `${this.anneeAccademique.id}`:null;
  }

  @Field(() => ID)
  @Property({ persist: false })
  get yearName(): string | null {
    return this.anneeAccademique? `${this.anneeAccademique.getEntity().name}`:null;
  }

  @Field(() => ID)
  @Property({ persist: false })
  get salleId(): string | null {
    return  this.salle? `${this.salle.id}`:null;
  }

  @Field(() => ID, { nullable: true })
  @Property({ persist: false })
  get salleName(): string | null {
    return this.salle? `${this.salle.getEntity().name}` : null;

}
}