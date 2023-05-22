/* eslint-disable prettier/prettier */
import { ObjectType } from "@nestjs/graphql";
import { PrimePersonnel } from "src/entities/prime-personnel.entity";
import { PaginatedResponse } from "src/pagination";


@ObjectType()
export class PrimePersonnelPaginatedResponse extends PaginatedResponse(
PrimePersonnel) {}