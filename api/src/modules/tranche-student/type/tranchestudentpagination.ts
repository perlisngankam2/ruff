/* eslint-disable prettier/prettier */
import { ObjectType } from "@nestjs/graphql";
import { TrancheStudent } from "src/entities/tranche-student.entity";
import { PaginatedResponse } from "src/pagination";


@ObjectType()
export class TrancheStudentPaginatedResponse extends PaginatedResponse(
TrancheStudent) {}