/* eslint-disable prettier/prettier */
import { ObjectType } from "@nestjs/graphql";
import { Pension } from "src/entities/pension.entity";
import { Student } from "src/entities/student.entity";
import { PaginatedResponse } from "src/pagination";


@ObjectType()
export class PensionPaginatedResponse extends PaginatedResponse(
Pension) {}