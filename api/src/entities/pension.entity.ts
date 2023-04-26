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
import { AnneeAccademique } from './annee-accademique.entity';
import { NiveauEtude } from './niveau-etude.entity';
import { Salaire } from './salaire.entity';
import { Salle } from './salle.entity';
import { Tranche } from './tranche.entity';
import { Student } from './student.entity';
import { Expense } from './expense.entity';


@Entity()
@ObjectType()
export class Pension {
  
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

  @Field({defaultValue:false})
  @Property({default:false})
  complete!: boolean;

  @Field({ defaultValue:0.000 })
  @Property({ default:0.000 })
  reste!: number;

  @Field({ defaultValue:0.000 })
  @Property({ default:0.000 })
  surplus!: number;

  @Field(() => Date, { nullable: true })
  @Property({ nullable: true })
  dateLine!: Date | null;

// relation with another Entites
  // @OneToOne(() => Salle, (salle) => salle.pension, {
  //   owner: true,
  //   unique: true,
  //   onDelete: 'CASCADE',
  // })
  // salle!: IdentifiedReference<Salle> | null;

  // @OneToOne(() => NiveauEtude, (niveauEtude) => niveauEtude.pension, {
  //   owner: true,
  //   unique: true,
  //   onDelete: 'CASCADE',
  // })
  // niveauEtude!: IdentifiedReference<NiveauEtude>;

  // @OneToMany(() => Tranche, tranche => tranche.pension)
  // tranche = new Collection<Tranche>(this);

  @ManyToOne(() => AnneeAccademique ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  anneeAccademique!:IdentifiedReference<AnneeAccademique>|null

  
  @ManyToOne(() => Student ,{
    nullable:true,
    onDelete:'CASCADE',
    unique: true
  })
  student!:IdentifiedReference<Student>|null

  @Field(() => ID)
  @Property({ persist: false })
  get yearid() {
    return `${this.anneeAccademique.id}`;
  }

  @Field(() => ID)
  @Property({ persist: false })
  get studentid() {
    return `${this.student.id}`;
  }
}