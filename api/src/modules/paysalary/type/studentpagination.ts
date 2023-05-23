/* eslint-disable prettier/prettier */
import { ObjectType } from "@nestjs/graphql";
import { PaySalary } from "src/entities/paysalary.entity";
import { Student } from "src/entities/student.entity";
import { PaginatedResponse } from "src/pagination";


@ObjectType()
export class PaySalaryPaginatedResponse extends PaginatedResponse(
PaySalary) {}