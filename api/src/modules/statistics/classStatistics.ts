/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ClassStatistics {
  @Field()
  sectionName: string;

  @Field()
  className: string;

  @Field()
  numberOfStudents: number;

  @Field()
  expectedAmount: number;

  // @Field()
  // numberOfStudentsCompletedFee: number;

  // @Field()
  // rateR: number;

  @Field()
  sumAmountAlreadyPaid: number;

  @Field()
  rateT: number;

  // @Field()
  // numberOfStudentsNotPaid: number;

  // @Field()
  // rateS: number;

  @Field()
  amountRest: number;

  @Field()
  rateZ: number;
}


@ObjectType()
export class TOTAL{
@Field()
TOTAL_EFFECTIFS_ENREGISTRES:number

@Field()
TOTAL_MONTANT_ATTENDU:number

@Field()
TOTAL_MONTANT_EN_CAISSE:number

@Field()
TOTAL_TAUX_ENCAISSEMENT:number

@Field()
TOTAL_RESTE_A_RECOUVRER:number

@Field()
TAUX_RAR:number
}

@ObjectType()
export class TOTALTABLEONE{
@Field()
TOTAL_EFFECTIFS_ENREGISTRES:number

@Field()
TOTAL_MONTANT_ATTENDU:number

@Field()
TOTAL_NOMBRE_ENCAISSEMENT:number

@Field()
TOTAL_NOMBRE_SANS_ENCAISSEMENT:number

@Field()
TOTAL_MONTANT_EN_CAISSE:number

@Field()
TOTAL_FIRST_TAUX_ENCAISSEMENT:number

@Field()
TOTAL_SECOND_TAUX_ENCAISSEMENT:number

@Field()
TOTAL_RESTE_A_RECOUVRER:number

@Field()
TOTAL_FIRST_TAUX_RECOUVRIR:number

@Field()
TOTAL_SECOND_TAUX_RECOUVRIR:number
}

@ObjectType()
export class TrancheStat{
@Field()
studentid:string

@Field()
Nom:string

@Field()
Priority:number

@Field()
Rest:number
}