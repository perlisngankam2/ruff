/* eslint-disable prettier/prettier */
import { Field, Float, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ClassType } from "type-graphql";


@ObjectType()
export class StudentStatistics {
  @Field()
  name: string;

  @Field()
  matricle: string;

  
  @Field()
  section: string;

  @Field({nullable:true})
  amountExpected: number;

  @Field({nullable:true})
  amountPaid: number;

  @Field({nullable:true})
  collectionRate: number;

  @Field({nullable:true})
  restToPay: number;

  @Field({nullable:true})
  rateArrears: number;
}


export function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    items!: TItem[];

    @Field(() => Int)
    total!: number;

    @Field()
    hasMore!: boolean;
  }

  return PaginatedResponseClass;
}

@InputType()
export class PaginationInput {
  @Field(() => Int)
  take!: number;

  @Field(() => Int)
  skip = 0;
}

export async function paginate<T>(
  items: T[],
  input: PaginationInput,
): Promise<ReturnType<typeof PaginatedResponse>> {
  const count = items.length;
  const startIndex = input.skip;
  const endIndex = startIndex + input.take;
  const slicedItems = items.slice(startIndex, endIndex);
  const hasMore = endIndex < count;

  const PaginatedResponseClass = PaginatedResponse(Object.getPrototypeOf(slicedItems[0]).constructor);
  return new PaginatedResponseClass({
    items: slicedItems,
    total: count,
    hasMore,
  });
}





@ObjectType()
export class StudentStatisticsPaginatedResponse extends PaginatedResponse(
  StudentStatistics) {}

