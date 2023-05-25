/* eslint-disable prettier/prettier */
import { ObjectType } from "@nestjs/graphql";
import { AvanceTranche } from "src/entities/avance-tranche.entity";
import { PaginatedResponse } from "src/pagination";


@ObjectType()
export class AvanceTranchePaginatedResponse extends PaginatedResponse(
AvanceTranche) {}