/* eslint-disable prettier/prettier */
import { ObjectType } from "@nestjs/graphql";
import { Personnel } from "src/entities/pesonnel.entity";
import { Student } from "src/entities/student.entity";
import { PaginatedResponse } from "src/pagination";


@ObjectType()
export class PersonnelPaginatedResponse extends PaginatedResponse(
Personnel) {}