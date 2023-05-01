/* eslint-disable prettier/prettier */
import {Query, Resolver } from "@nestjs/graphql";
import { StatisticsService } from "./statistics.service";
import { SectionStatistics } from "src/modules/statistics/sectionstatistics";
import { StudentStatistics } from "./studentstatistics";
import { ClassStatistics } from "./classStatistics";
import { SpecialStudentStatistics } from "./specialRegimeStudent";



@Resolver()
export class StatisticResolver {
  constructor(private readonly statisticsService: StatisticsService) {}


  @Query(() => [StudentStatistics])
  async studentStatistics(): Promise<StudentStatistics[]> {
    return this.statisticsService.getStudentStatistics();
  }

  @Query(() => [SectionStatistics])
  async sectionStatistics(): Promise<SectionStatistics[]> {
    return this.statisticsService.getSectionStatistics();
  }

  @Query(() => [ClassStatistics])
  async classStatistics(): Promise<ClassStatistics[]> {
    return this.statisticsService.getClassStatistics();
  }

  @Query(() => [SpecialStudentStatistics])
  async getTrancheStatisticsForSpecialStudents(): Promise<SpecialStudentStatistics[]> {
    return this.statisticsService.getTrancheStatisticsForSpecialStudents();
  }

  


}
