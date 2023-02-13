/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../auth/roles/roles';
// import { LoginInput } from '../auth/dto/login.input';
// import { AuthGuard } from '../auth/guards/auth.gaurd';
import { UserCreateInput } from './dto/user.input';
import { UpdateUserInput } from './dto/user.update';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createuser(@Args('createUser') createUserInput: UserCreateInput) {
    console.log(this.userService.create(createUserInput));
    return this.userService.create(createUserInput);
    
  }

  // @Query(() => [User], { name: 'user' })
  // findAll() {
  //   return this.userService.getAll();
  // }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  findAlluser() { 
    return this.userService.getAll();
  }

  @Query(() => User, { name: 'user' })
  findOneUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(()=>User)
  async updateuser(@Args('id') id:string,@Args('input') input:UpdateUserInput){
    return await this.userService.update(id,input)
  }

  @Mutation(()=> User)
  async deleteuser(@Args('id') id:string){
 return await this.userService.delete(id)
  }

  }

  // @Query(()=> User)
  // async logtest(@Args('id') id:string,@Args('email') email:string){
  
  // const a='12'
  // console.log(this.userService.hashPassword(a))
  // console.log(await this.userService.log(id,email))
  // return await this.userService.log(id,email);
  // }




