/* eslint-disable prettier/prettier */
import { QueryOrderMap } from '@mikro-orm/core';
import { QueryBuilder } from '@mikro-orm/postgresql';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ClassType } from 'type-graphql';

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

export async function paginate<T extends object>(
  qb: QueryBuilder<T>,
  input: PaginationInput,
  countColumn = '*',
  orderBy: QueryOrderMap<T>  = {},
  groupBys?: string[],
) {
  const countQb = qb.clone().count(countColumn, true);
  const resultsQb = qb.orderBy(orderBy);

  if (groupBys && groupBys.length > 0) {
    resultsQb.groupBy(groupBys);
  }

  const [resCount, res] = await Promise.all([
    countQb.execute<{ count: number }>('get'),
    resultsQb.offset(input.skip).limit(input.take).getResult(),
  ]);

  const count = resCount ? resCount.count : 0;

  return {
    items: res,
    total: count,
    hasMore: input.skip + input.take < count,
  };
}

export async function fetch<T extends object>(
  qb: QueryBuilder<T>,
  input: PaginationInput,
  orderBy: QueryOrderMap<T> = {},
  groupBys?: string[],
) {
  const resultQb = qb.orderBy(orderBy);

  if (groupBys && groupBys.length > 0) {
    resultQb.groupBy(groupBys);
  }

  return resultQb.offset(input.skip).limit(input.take).getResult();
}

export async function count<T extends object>(qb: QueryBuilder<T>, countColumn = '*') {
  const countQb = qb.count(countColumn, true);

  const res = await countQb.execute<{ count: number }>('get');

  return res.count || 0;
}

// QueryOrderMap<T, keyof T> = {}