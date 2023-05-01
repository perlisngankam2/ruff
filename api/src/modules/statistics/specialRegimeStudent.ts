/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SpecialStudentStatistics {
    @Field()
    amountToPay: number;

    @Field()
    dateLine: Date;

    @Field()
    restOfAmountToPay: number;

    @Field()
    amountAlreadyPaid: number;

    @Field()
    paymentDate: Date;

    @Field()
    studentFirstName: string;

    @Field()
    studentLastName: string;

    @Field()
    studentPhoneNumber: string;
    
    @Field()
    paymentPriority: number;
  }