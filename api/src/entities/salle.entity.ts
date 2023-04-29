/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    Enum,
    IdentifiedReference,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryKeyType,
    Property,
  } from '@mikro-orm/core';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PrimaryKeyUuid } from '../decorators/PrimaryKeyUuid.decorator';
import { FraisExamen } from './frais-exament.entity';
import { FraisInscription } from './frais-inscription.entity';
import { NiveauEtude } from './niveau-etude.entity';
import { Pension } from './pension.entity';
import { PersonnelSalle } from './personnelsalle.entity';
import { Personnel } from './pesonnel.entity';
import { Student } from './student.entity';
import { Cycle } from './cycle.entity'; 
import { PensionSalle } from './pensionsalle.entity';
import { AnneeAccademique } from './annee-accademique.entity';

@Entity()
@ObjectType()
export class Salle{
    @Field(() => ID)
    @PrimaryKeyUuid()
    id!: string;
  
    @Field({ nullable: true })
    @Property({nullable:true})
    name!: string;

    @Field({ nullable: true })
    @Property({nullable:true})
    section!: string;

    @Field({nullable: true})
    @Property({nullable: true})
    montantPensionSalle!: number;

    @Field({ nullable: true })
    @Property({nullable:true})
    effectif!: number;

    @Property({ onCreate: () => new Date() })
    createdAt = new Date();

// elation entities 
    @ManyToOne(() => NiveauEtude, {
        nullable: true,
        onDelete: 'CASCADE',
      })
    niveau!: IdentifiedReference<NiveauEtude> | null;

    @ManyToOne(() => Cycle, {
      nullable: true,
      onDelete: 'CASCADE',
    })
    cycle!: IdentifiedReference<Cycle> | null;

    @ManyToOne(() => AnneeAccademique, {
      nullable: true,
      onDelete: 'CASCADE',
    })
    anneeAcademique!: IdentifiedReference<AnneeAccademique> | null;

    
    // @OneToOne(() => Pension, (pension) => pension.salle, {
    //     owner: false,
    //     nullable: true,
    //   })
    // pension!: IdentifiedReference<Pension> | null;

    @OneToOne(() => FraisExamen, (fraisExamen) => fraisExamen.salle, {
        owner: false,
        nullable: true,
      })
    fraisExamen!: IdentifiedReference<FraisExamen> | null;

    @OneToOne(() => FraisInscription, (fraisInscription) => fraisInscription.salle, {
        owner: false,
        nullable: true,
      })
    fraisInscription!: IdentifiedReference<FraisInscription> | null;

    @OneToMany(()=>Personnel, (teacher) => teacher.salle)
    teacher = new Collection<Personnel>(this)

    @OneToMany(()=>Student, (student) => student.salle)
    student = new Collection<Student>(this)

    @OneToMany(()=>PersonnelSalle, (personnelsalle) => personnelsalle.salle)
    personnelsalle = new Collection<PersonnelSalle>(this)

    @OneToMany(()=>PensionSalle, (pensionsalle) => pensionsalle.salle)
    pensionsalle = new Collection<PensionSalle>(this)

    @Field(() => ID)
    @Property({ persist: false })
    get niveauid() {
      return `${this.niveau.id}`;
    }

    // @Field(() => ID)
    // @Property({ persist: false })
    // get cycleid() {
    //   return `${this.cycle.id}`;
    // }

}