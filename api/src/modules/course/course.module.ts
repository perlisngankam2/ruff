/* eslint-disable prettier/prettier */
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Course } from "src/entities/course.entity";
import { CourseResolver } from "./course.resolver";
import { CourseService } from "./course.service";


@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Course] }),
        
    ],
    providers:[CourseResolver,CourseService],
    exports:[CourseService]
})
export class CourseModule {}