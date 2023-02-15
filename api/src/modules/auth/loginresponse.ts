/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";
import { Personnel } from "src/entities/pesonnel.entity";
import { User } from "../../entities/user.entity";



@ObjectType()
export class LoginResponse{
    @Field()
    access_token: string

    @Field(() => User)
    user: User
}

@ObjectType()
export class LoginResponsePersonnel{
    @Field()
    access_token: string

    @Field(() => User)
    personnel: Personnel
}

