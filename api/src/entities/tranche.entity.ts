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

  @OneToMany(()=>TrancheStudent, (trancheStudent) => trancheStudent.tranche)
  trancheStudent = new Collection<TrancheStudent>(this)

  @ManyToOne(() => AnneeAccademique ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  anneeAccademique!:IdentifiedReference<AnneeAccademique>|null

  @ManyToOne(() => Pension ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  pension!:IdentifiedReference<Pension>|null
}