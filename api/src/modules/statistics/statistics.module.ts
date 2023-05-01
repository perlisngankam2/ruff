/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { TrancheStudentModule } from "../tranche-student/tranche-student.module";
import { StatisticResolver } from "./statistics.resolver";
import { TrancheModule } from "../tranche/tranche.module";
import { StudentModule } from "../student/student.module";
import { StatisticsService } from "./statistics.service";
import { SectionModule } from "../section/section.module";


@Module({
    imports:[
        StudentModule,
        SectionModule,
        TrancheModule,
        TrancheStudentModule
    ],
    providers:[StatisticsService,StatisticResolver],
    exports:[StatisticsService]
})
export class StatisticModule {}
