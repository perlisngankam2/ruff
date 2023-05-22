/* eslint-disable prettier/prettier */
import { ObjectType } from "@nestjs/graphql";
import { AvanceTranche } from "src/entities/avance-tranche.entity";
import { User } from "src/entities/user.entity";
import { PaginatedResponse } from "src/pagination";


@ObjectType()
export class UserPaginatedResponse extends PaginatedResponse(
User) {}