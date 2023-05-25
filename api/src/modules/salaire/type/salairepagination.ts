/* eslint-disable prettier/prettier */
import { ObjectType } from "@nestjs/graphql";
import { Salaire } from "src/entities/salaire.entity";
import { Student } from "src/entities/student.entity";
import { PaginatedResponse } from "src/pagination";


@ObjectType()
export class SalairePaginatedResponse extends PaginatedResponse(
Salaire) {}