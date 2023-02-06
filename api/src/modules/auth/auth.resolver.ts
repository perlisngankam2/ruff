/* eslint-disable prettier/prettier */
import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { User } from "src/entities/user.entity";
import { AuthService } from "./auth.service";
import { GqlAuthGuard } from "./guards/gql-auth.guards";
import { LoginInput } from "./login.input";
import { LoginResponse } from "./loginresponse";


@Resolver()
export class AuthResolver{
    constructor(private authservice: AuthService){}

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(@Args('loginInput') loginInput: LoginInput, @Context() context ){
        return this.authservice.login(context.user);
    }


}