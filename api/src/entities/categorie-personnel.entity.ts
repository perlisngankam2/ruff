/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    Enum,
    Filter,
    IdentifiedReference,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryKey,
    Property,
    Unique,
  } from '@mikro-orm/core';
  import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryKeyUuid } from '../decorators/PrimaryKeyUuid.decorator';
import { Personnel } from './pesonnel.entity';
import { Prime } from './prime.entity';
import { Retenue } from './retenu-salaire.entity';
import { SalaireBase } from './salaire-base.entity';


@Entity()
@ObjectType()
export class CategoriePersonnel {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  nom!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description!: string;

  @Field({nullable:false})
  @Property({ nullable: false })
  montant?: number;

  // relation with another Entites
  @OneToMany(() => Personnel, personnel => personnel.category)
  personnel = new Collection<Personnel>(this);

  @ManyToOne(() => Prime ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  prime!:IdentifiedReference<Prime>|null

  @ManyToOne(() => Retenue,{
    nullable:true,
    onDelete:'CASCADE'
  })
  retenu!:IdentifiedReference<Retenue>|null

  @ManyToOne(() => SalaireBase ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  salaireBase!:IdentifiedReference<SalaireBase>|null

  // @ManyToMany(() => SalaireBase, salairebase => salairebase.categoriePersonnel)
  // salairebase = new Collection<SalaireBase>(this);
  
}