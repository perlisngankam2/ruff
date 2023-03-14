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
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PrimaryKeyUuid } from '../decorators/PrimaryKeyUuid.decorator';
import { AvanceTranche } from './avance-tranche.entity';
import { Student } from './student.entity';
import { Tranche } from './tranche.entity';

export enum RegimePaiement {
  SPECIAL = 'SPECIAL',
  NORMAL = 'NORMAL',
}

registerEnumType(RegimePaiement, {
  name: 'RegimePaiement',
});

@Entity()
@ObjectType()
export class TrancheStudent {
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

  @Field({nullable:true})
  @Property({nullable:true})
  montant!: number;

  // @Field()
  // @Enum({
  //   items: () => RegimePaiement,
  //   default: RegimePaiement.NORMAL,
  // })
  // regimePaimemnt!: RegimePaiement;

  @Field({defaultValue:false})
  @Property({default:false})
  complete!: boolean;

  @Field({ defaultValue:0.000 })
  @Property({ default:0.000 })
  reste!: number;

  @Field({ defaultValue:0.000 })
  @Property({ default:0.000 })
  surplus!: number;

  @ManyToOne(() => Student ,{
    nullable:false,
    onDelete:'CASCADE',
    unique: true
  })
  student!:IdentifiedReference<Student>|null

  @ManyToOne(() => Tranche ,{
    nullable:true,
    onDelete:'CASCADE',
    unique:true
  })
  tranche!:IdentifiedReference<Tranche>|null

  @OneToMany(()=>AvanceTranche, (avance) => avance.trancheStudent)
  avancheTranche = new Collection<AvanceTranche>(this)

}