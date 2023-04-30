/* eslint-disable prettier/prettier */
import { Field, Float, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class StudentStatistics {
  @Field()
  name: string;

  @Field()
  matricle: string;

  @Field(() => Float)
  amountExpected: number;

  @Field(() => Float)
  amountPaid: number;

  @Field(() => Float)
  collectionRate: number;

  @Field(() => Float)
  restToPay: number;

  @Field(() => Float)
  rateArrears: number;
}

