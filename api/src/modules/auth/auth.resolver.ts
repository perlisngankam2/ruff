/* eslint-disable prettier/prettier */
import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Personnel } from "src/entities/pesonnel.entity";
import { User } from "src/entities/user.entity";
import { AuthService } from "./auth.service";
import { Host } from "./decorators/host.decorator";
import { GqlAuthGuard } from "./guards/gql-auth.guards";
import { LoginInput } from "./login.input";
import { LoginResponse, LoginResponsePersonnel } from "./loginresponse";


@Resolver()
export class AuthResolver{
    constructor(private authservice: AuthService){}

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(@Args('loginInput') loginInput: LoginInput, @Context() context ){
        return this.authservice.login(context.user);
    }


    @Mutation(() => LoginResponsePersonnel)
    @UseGuards(GqlAuthGuard)
    loginpersonnel(@Args('loginInput') loginInput: LoginInput, @Context() context ){
        return this.authservice.loginpersonnel(context.personnel);
    }

    @Query(() => Personnel)
    @UseGuards(GqlAuthGuard)
    async me( @Host() viewer: Personnel) {
        return viewer
    }

}