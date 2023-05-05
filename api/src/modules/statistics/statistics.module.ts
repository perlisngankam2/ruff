/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { TrancheStudentModule } from "../tranche-student/tranche-student.module";
import { StatisticResolver } from "./statistics.resolver";
import { TrancheModule } from "../tranche/tranche.module";
import { StudentModule } from "../student/student.module";
import { StatisticsService } from "./statistics.service";
import { SectionModule } from "../section/section.module";
import { AvanceTrancheModule } from "../avance_tranche/avance_tranche.module";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Tranche } from "src/entities/tranche.entity";
import { Student } from "src/entities/student.entity";


@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Tranche] }),
        SectionModule,
        TrancheModule,
        TrancheStudentModule,
        AvanceTrancheModule,
        StudentModule
    ],
    providers:[StatisticsService,StatisticResolver],
    exports:[StatisticsService]
})
export class StatisticModule {}
