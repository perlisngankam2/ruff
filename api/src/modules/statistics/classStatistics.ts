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