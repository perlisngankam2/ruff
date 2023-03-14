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
import { Periode } from './periode.entity';
import { Personnel } from './pesonnel.entity';
import { PrimePersonnel } from './prime-personnel.entity';
import { RetenuPersonnel } from './retenu-personnel.entity';


@Entity()
@ObjectType()
export class Salaire {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  // @Field({ nullable: true })
  // @Property({ nullable: true })
  // description!: string;

  
  @Field({ defaultValue: false })
  @Property({ default: false })
  payer!: boolean;


  @Field({ defaultValue: 0 })
  @Property({ default: 0 })
  montant!: number ;

  @Field({ nullable: true })
  @Property({ nullable: true })
  jourPaie!: string; 

  @Field({ nullable: true })
  @Property({ nullable: true })
  moisPaie!: string; 
  
// relation with another Entites
  @ManyToOne(() => Periode ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  periode!:IdentifiedReference<Periode>|null

  // @ManyToOne(() => Personnel ,{
  //   nullable:true,
  //   onDelete:'CASCADE'
  // })
  // personnel!:IdentifiedReference<Personnel>|null

  @OneToMany(() => PrimePersonnel, primePersonel => primePersonel.salaire)
  primePersonnel = new Collection<PrimePersonnel>(this);

  @OneToMany(() => RetenuPersonnel, retenuPernole => retenuPernole.salaire)
  retenuPersonnel = new Collection<RetenuPersonnel>(this);

  @ManyToMany(() => Personnel, personnel => personnel.salaire,{owner: true})
  personnel = new Collection<Personnel>(this);
 
  // @ManyToOne(() => RetenuPersonnel ,{
  //   nullable:false,
  //   onDelete:'SET NULL'
  // })
  // retenuPersonnel!:IdentifiedReference<RetenuPersonnel>|null

}