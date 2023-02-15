/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../roles/roles";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean{
        //let us extract required roles
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles',[
      context.getHandler(),
      context.getClass(),
      ]);

      if(!requiredRoles){
         return true
      }
      //extract the user
      const {user} = context.switchToHttp().getResponse() 
      //does the user has the required roles
      return requiredRoles.some((role) => user.roles.includes(role)) || requiredRoles.some((fonction) => user.roles.includes(fonction))
    } 

}