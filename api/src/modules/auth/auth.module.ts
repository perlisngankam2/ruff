/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PersonnelModule } from "../personnel/personnel.module";
import { UserModule } from "../user/user.module";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { User } from "src/entities/user.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";

@Module({
    imports: [MikroOrmModule.forFeature({ entities: [User] }),PassportModule, UserModule, PersonnelModule,
    JwtModule.register({
        signOptions: {expiresIn: '1d'},
        secret: 'hide-me'
    })],
    providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
    exports: [AuthService,AuthResolver]
})
export class Authmodule{}