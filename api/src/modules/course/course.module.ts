/* eslint-disable prettier/prettier */
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Course } from "src/entities/course.entity";
import { CourseResolver } from "./course.resolver";
import { CourseService } from "./course.service";
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserModule } from '../user/user.module';


@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Course] }),
        UserModule,

        
    ],
    providers:[CourseResolver,CourseService, RolesGuard],
    exports:[CourseService]
})
export class CourseModule {}