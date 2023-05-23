/* eslint-disable prettier/prettier */
import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    getRequest(context: ExecutionContext){
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        // Assuming the user information is available in the request
        // Modify this line based on how the user information is stored in the request object
        const user = req.user;
    
        // Attach the user information to the request object
        req.user = user;
    
        return req;
    }
}