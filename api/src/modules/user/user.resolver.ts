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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../auth/roles/roles';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guards';
import { UserPaginatedResponse } from './type/userpagination';
import { PaginationInput } from 'src/pagination';

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
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ADMIN)
  findAlluser() {
    return this.userService.getAll();
  }

  @Query(() => User, { name: 'user' })
  findOneUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

@Query(() => UserPaginatedResponse)
async pagiantionResponseUser(
  @Args('pagination') pagination: PaginationInput,
): Promise<UserPaginatedResponse> {
  return await this.userService.pagiantionResponseUser(pagination);
}

  @Mutation(()=>User)
  async updateuser(@Args('id') id:string,@Args('input') input:UpdateUserInput){
    return await this.userService.update(id,input)
  }

  @Mutation(()=> User)
  async deleteuser(@Args('id') id:string){
 return await this.userService.delete(id)
  }

  @Query(()=>[String])
  async getAllEmails(){
  return await this.userService.getAllEmails()
  }
}
