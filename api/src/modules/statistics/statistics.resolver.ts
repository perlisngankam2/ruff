/* eslint-disable prettier/prettier */
import {Query, Resolver, Args} from "@nestjs/graphql";
import { StatisticsService } from "./statistics.service";
import { SectionStatistics } from "src/modules/statistics/sectionstatistics";
import { StudentStatistics } from "./studentstatistics";
import { ClassStatistics } from "./classStatistics";
import { SpecialStudentStatistics } from "./specialRegimeStudent";



@Resolver()
export class StatisticResolver {
  constructor(private readonly statisticsService: StatisticsService) {}


  @Query(() => [StudentStatistics])
  async getStudentStatisticsAnglophone(): Promise<StudentStatistics[]> {
    return this.statisticsService.getStudentStatisticsAnglophone();
  }

  @Query(() => [StudentStatistics])
  async getStudentStatisticsFrancophone(): Promise<StudentStatistics[]> {
    return this.statisticsService.getStudentStatisticsFrancophone();
  }
  

  @Query(() => [SectionStatistics])
  async getSectionStatisticsAnglophoneAdmissionFee(): Promise<SectionStatistics[]> {
    return this.statisticsService.getSectionStatisticsAnglophoneAdmissionFee();
  }

  @Query(() => [SectionStatistics])
  async getSectionStatisticsAnglophoneFirstInstalment(): Promise<SectionStatistics[]> {
    return this.statisticsService.getSectionStatisticsAnglophoneFirstInstalment();
  }

  @Query(() => [SpecialStudentStatistics])
  async getTrancheStatisticsForSpecialStudents(): Promise<SpecialStudentStatistics[]> {
    return this.statisticsService.getTrancheStatisticsForSpecialStudents();
  }

  @Query(() => [SectionStatistics])
  getSectionStatisticsAnglophoneSecondInstalment(): Promise<SectionStatistics[]> {
    return this.statisticsService.getSectionStatisticsAnglophoneSecondInstalment();
  }
  
  @Query(() => [SectionStatistics])
  getSectionStatisticsFrancophoneAdmissionFee(): Promise<SectionStatistics[]> {
    return this.statisticsService.getSectionStatisticsFrancophoneAdmissionFee();
  }

  @Query(() => [SectionStatistics])
  getSectionStatisticsFrancophoneFirstInstalment(): Promise<SectionStatistics[]> {
    return this.statisticsService.getSectionStatisticsFrancophomeFirstInstalment();
  }

  @Query(() => [SectionStatistics])
  getSectionStatisticsFrancophoneSecondInstalment(): Promise<SectionStatistics[]> {
    return this.statisticsService.getSectionStatisticsFrancophoneSecondInstalment();
  }

  @Query(() => Number)
  async numberOfStudentsStartedPayingPension() {
    return await this.statisticsService.numberOfStudentsStartedPayingPension();
  }

  // @Query(() => [SectionStatistics])
  // getGeneralSectionStatistics(): Promise<SectionStatistics[]> {
  //   return this.statisticsService.getGeneralSectionStatistics()
  // }

  @Query(() => [ClassStatistics])
  getGeneralAnglophoneSectionStatistics(): Promise<ClassStatistics[]> {
    return this.statisticsService.getGeneralAnglophoneClassStatistics()
  }
  @Query(() => [ClassStatistics])
  getGeneralFrancophoneSectionStatistics(): Promise<ClassStatistics[]> {
    return this.statisticsService.getGeneralFrancophoneClassStatistics()
  }


  @Query(() => [SpecialStudentStatistics])
  getTrancheStatisticsForNormalStudents(): Promise<SpecialStudentStatistics[]> {
    return this.statisticsService.getTrancheStatisticsForNormalStudents();
  }

  @Query(() => Number)
  async getNumberOfStudentsStartedPayingAdmissionFeeSalle(@Args("sallename") sallename:string) {
    return await this.statisticsService.numberOfStudentsStartedPayingAdmissionFeeSalle((sallename));
  }

}
