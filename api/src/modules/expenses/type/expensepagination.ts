/* eslint-disable prettier/prettier */
import { ObjectType } from "@nestjs/graphql";
import { Expense } from "src/entities/expense.entity";
import { Student } from "src/entities/student.entity";
import { PaginatedResponse } from "src/pagination";


@ObjectType()
export class ExpensePaginatedResponse extends PaginatedResponse(
Expense) {}