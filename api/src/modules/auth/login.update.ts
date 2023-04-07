/* eslint-disable prettier/prettier */


import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class LoginUpdate{
    @Field()
    email:string

    @Field()
    oldpassword: string

    @Field()
    newpassword: string

}