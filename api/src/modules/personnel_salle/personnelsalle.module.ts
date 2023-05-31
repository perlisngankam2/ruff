/* eslint-disable prettier/prettier */
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { PersonnelSalle } from "src/entities/personnelsalle.entity";
import { PersonnelModule } from "../personnel/personnel.module";
import { SalleModule } from "../salle/salle.module";
import { PersonnelSalleResolver } from "./personnelsalle.resolver";
import { PersonnelSalleService } from "./personnelsalle.service";
import { CourseModule } from "../course/course.module";
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserModule } from '../user/user.module';


@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [PersonnelSalle] }),
        PersonnelModule,
        CourseModule,
        SalleModule,
        UserModule,

    ],
    providers:[PersonnelSalleService,PersonnelSalleResolver, RolesGuard],
    exports:[PersonnelSalleService]
})
export class PersonnelSalleModule {}