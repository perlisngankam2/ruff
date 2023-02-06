/* eslint-disable prettier/prettier */

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { LoginInput } from "./login.input";
import { User } from "src/entities/user.entity";
import { JwtService } from "@nestjs/jwt";




@Injectable()
export class AuthService{
    constructor(private readonly userservice: UserService,
                private readonly jwtservice:JwtService){}
  
async compareHash(rawPassword: string, hashedPassword: string) {
        return bcrypt.compare(rawPassword, hashedPassword);
      }

async validateUser(email:string,passwd:string) {
        const user = await this.userservice.findOne(
          { email: email,
            },
          
        );
        const{password, ...result}= user

        console.log(user);
        if (!user)
          throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
        const isPasswordValid = await this.compareHash(
          passwd,
          user.password,
        );
        console.log(isPasswordValid);
        return isPasswordValid ? result: null;
}

async login(user:User){
   return {
        access_token: this.jwtservice.sign({
            username: user.email,
            password: user.password, 
            sub: user.id}),
        user
    }
}


}