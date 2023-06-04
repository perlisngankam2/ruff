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
import { Tranche } from './tranche.entity';
import { Student } from './student.entity';
import { AnneeAccademique } from './annee-accademique.entity';
import { Parameter } from './parameter.entity';

@Entity()
@ObjectType()
export class AvanceTranche {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description!: string;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Field(() => Date, { nullable: true })
  @Property({ nullable: true })
  dateLine!: Date | null;

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  anneAcademique!: string;

  @Field({ defaultValue:0 })
  @Property({ default:0 })
  montant!: number;

  @Field({ defaultValue:0 })
  @Property({ default:0 })
  reste!: number;

  @Field({ defaultValue: false })
  @Property({default:false})
  complete!: boolean;

  @ManyToOne(() => Student ,{
    nullable:false,
    onDelete:'CASCADE',
  })
  student!:IdentifiedReference<Student>|null

  
  @ManyToOne(() => AnneeAccademique ,{
    nullable:true,
    onDelete:'CASCADE',
  })
  anneeAcademique!:IdentifiedReference<AnneeAccademique>|null

  @ManyToOne(() => Tranche ,{
    nullable:false,
    onDelete:'CASCADE'
  })
  tranche!:IdentifiedReference<Tranche>|null

  @Field(() => ID)
  @Property({ persist: false })
  get studentid() {
    return `${this.student.id}`;
  }

  @Field(() => ID)
  @Property({ persist: false })
  get trancheid() {
    return `${this.tranche.id}`;
  }

}