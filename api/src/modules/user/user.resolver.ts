/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UserCreateInput } from './dto/user.input';
import { UpdateUserInput } from './dto/user.update';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createuser(@Args('createUser') createUserInput: UserCreateInput) {
    return this.userService.create(createUserInput);
  }

  // @Query(() => [User], { name: 'user' })
  // findAll() {
  //   return this.userService.getAll();
  // }

  @Query(() => [User])
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
