/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import {PassportStrategy} from '@nestjs/passport';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authservice: AuthService){
        super({
            emailField: 'username'
        })
    }

async validateuser(username:string, password:string):Promise<any>{
 const user = await this.authservice.validateUser(username, password) 
 
 if(!user){
    throw new UnauthorizedException();
 }

 return user
}

async validatepersonnel(username:string, password:string):Promise<any>{
    const personnel = await this.authservice.validatePersonnel(username, password) 
    
    if(!personnel){
       throw new UnauthorizedException();
    }
   
    return personnel
   }


}