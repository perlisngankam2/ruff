/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";
import { PaginatedResponse } from "src/pagination";

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
export class TrancheStatNotPayed{
@Field()
studentid:string

@Field()
Nom:string

@Field()
Priority:number

@Field()
Rest:number
}

@ObjectType()
export class TrancheStatNotReceived{
@Field()
studentid:string

@Field()
Nom:string

@Field()
Priority:number

@Field()
montantPercu:number
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

@Field(() => [TrancheStatNotPayed], { nullable: true }) 
trancheNotPayed?: TrancheStatNotPayed[];
}



@ObjectType()
export class TOTALTABLETWO{
@Field()
MONTANT_ATTENDU:number

@Field()
MONTANT_EN_CAISSE: number

@Field()
TAUX_ENCAISSEMENT:number

@Field()
RESTE_RECOUVRER:number

@Field()
TAUX_RAR:number
}

@ObjectType()
export class TranchStatTwo{
@Field()
studentid:string

@Field()
Nom:string

@Field()
Priority:number

@Field()
montantPercu:number

@Field(() => [TrancheStatNotReceived], { nullable: true }) 
trancheNotPayed?: TrancheStatNotReceived[];
}

@ObjectType()
export class ClassStatisticsPaginatedResponse extends PaginatedResponse(
ClassStatistics) {}