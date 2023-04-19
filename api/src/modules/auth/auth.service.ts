/* eslint-disable prettier/prettier */

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { LoginInput } from "./login.input";
import { User } from "src/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { Personnel } from "src/entities/pesonnel.entity";
import { PersonnelService } from "../personnel/personnel.service";
import { LoginUpdate } from "./login.update";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";






@Injectable()
export class AuthService{
    constructor(
                @InjectRepository(User)
                private userrepository: EntityRepository<User>,
                private readonly userservice: UserService,
                private readonly personnelservice: PersonnelService,
                private readonly jwtservice:JwtService){}
  
async compareHash(rawPassword: string, hashedPassword: string) {
        return bcrypt.compare(rawPassword, hashedPassword);
      }

async updateLogin(input:LoginUpdate) {
        const user = await this.userservice.findOne(input.email);
        if (!user) {
          throw new Error('User not found');
        }
    
        const isMatch = await this.compareHash(input.oldpassword, user.password);
        if (!isMatch) {
          throw new Error('Old password is incorrect');
        }
    
        const hashedPassword = this.userservice.hashpass(input.newpassword);
        user.password = hashedPassword;
    
      await this.userrepository.persistAndFlush(user);
      return user;
      }


async validateUser(email:string,passwd:string) {
        const user = await this.userservice.findOne(
          { email: email,
            },
          
        );
        const{password, ...result}= user

        console.log(result);
        if (!user)
          throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
        const isPasswordValid = await this.compareHash(
          passwd,
          user.password,
        );
        console.log(isPasswordValid);
        return isPasswordValid ? result: null;
}

// async validatePersonnel(email:string,passwd:string){
//   const personnel = await this.personnelservice.findOne(
//     { email: email,
//       },
    
//   );
//   const{password, ...result}= personnel

//   console.log(result);
//   if (!personnel)
//     throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
//   const isPasswordValid = await this.compareHash(
//     passwd,
//     personnel.password,
//   );
//   console.log(isPasswordValid);
//   return isPasswordValid ? result: null;

// }

// async loginpersonnel(personnel:Personnel){
//   return {
//     access_token: this.jwtservice.sign({
//         username: personnel.email,
//         password: personnel.password, 
//         sub: personnel.id}),
//     personnel
// }

// }

async login(user:User){
  await this.userservice.findOne(user.id)
  user.lastConnection == new Date()
   return {
        access_token: this.jwtservice.sign({
            username: user.email,
            password: user.password,
            sub: user.id}),
        user
    }
}


}