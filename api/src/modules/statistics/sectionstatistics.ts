/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";
import { PaginatedResponse } from "src/pagination";


@ObjectType()
export class SectionStatistics {
  @Field()
  sectionName: string;

  @Field()
  className: string;

  @Field()
  numberOfStudents: number;

  @Field()
  numberOfStudentsStartedPaying:number;

  @Field()
  expectedAmount: number;

  @Field()
  numberOfStudentsCompletedFee: number;

  @Field()
  TAUXA: number;

  @Field()
  sumAmountAlreadyPaid: number;

  @Field()
  TAUXB: number;

  @Field()
  numberOfStudentsNotPaid: number;

  @Field()
  TAUXC: number;

  @Field()
  amountRest: number;

  @Field()
  TAUXD: number;
}

@ObjectType()
export class  SectionStatisticsPaginatedResponse extends PaginatedResponse(
  SectionStatistics ) {}