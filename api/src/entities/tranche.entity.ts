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
import { Pension } from './pension.entity';
import { Personnel } from './pesonnel.entity';
import { TrancheStudent } from './tranche-student.entity';
import { AnneeAccademique } from './annee-accademique.entity';
import { AvanceTranche } from './avance-tranche.entity';
import { Salle } from './salle.entity';
import { PensionSalle } from './pensionsalle.entity';


@Entity()
@ObjectType()
export class Tranche {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({nullable:true})
  @Property({nullable:true})
  name!: string;

  @Field({nullable:true})
  @Property({nullable:true})
  description!: string;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Field(() => Date, { nullable: true })
  @Property({ nullable: true })
  dateLine!: Date | null;

  @Field({ nullable: true })
  @Property({ nullable: true})
  montant!: number;

  @Field({ nullable: true })
  @Property({ nullable: true})
  priority!: number;

  @OneToMany(()=>TrancheStudent, (trancheStudent) => trancheStudent.tranche)
  trancheStudent = new Collection<TrancheStudent>(this)

  @OneToMany(()=>AvanceTranche, (avancetranche) => avancetranche.tranche)
  avancetranche = new Collection<AvanceTranche>(this)

  @ManyToOne(() => AnneeAccademique ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  anneeAccademique!:IdentifiedReference<AnneeAccademique>|null

  @ManyToOne(() => PensionSalle ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  pensionsalle!:IdentifiedReference<PensionSalle>|null

  @ManyToOne(() => Pension ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  pension!:IdentifiedReference<Pension>|null

   @ManyToOne(() => Salle ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  salle!:IdentifiedReference<Salle>|null

  @Field(() => ID)
  @Property({ persist: false })
  get yearid() {
    return `${this.anneeAccademique.id}`;
  }

  @Field(() => ID)
  @Property({ persist: false })
  get salleid() {
    return `${this.salle.id}`;
  }

  // @Field(() => ID)
  // @Property({ persist: false })
  // get pensionid() {
  //   return `${this.pension.id}`;
  // }

  // @ManyToOne(() => TranchePriority ,{
  //   nullable:false,
  //   onDelete:'CASCADE',
  //   unique: true
  // })
  // tranchepriority!:IdentifiedReference<TranchePriority>|null
}