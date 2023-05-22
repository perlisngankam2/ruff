/* eslint-disable prettier/prettier */
import { ObjectType } from "@nestjs/graphql";
import { Student } from "src/entities/student.entity";
import { PaginatedResponse } from "src/pagination";


@ObjectType()
export class StudentPaginatedResponse extends PaginatedResponse(
Student) {}