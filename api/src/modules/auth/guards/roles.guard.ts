/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/modules/user/user.service";
import { GqlAuthGuard } from "./gql-auth.guards";
import { GqlExecutionContext } from "@nestjs/graphql";


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('==============>roles'+roles)
 
    const request = await this.getRequest(context)
    console.log('==========>request'+request)
    if (request?.user) {
      const { id } = request.user;
      const user = await this.userService.findById(id);
      return roles.includes(user.role);
    }

    return false;
  }
}