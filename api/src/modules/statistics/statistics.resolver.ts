/* eslint-disable prettier/prettier */
import {Args, Query, Resolver } from "@nestjs/graphql";
import { StatisticsService } from "./statistics.service";
import { SectionStatistics } from "src/modules/statistics/sectionstatistics";
import { StudentStatistics } from "./studentstatistics";
import { ClassStatistics, TOTAL, TOTALTABLEONE, TOTALTABLETWO } from "./classStatistics";
import { SpecialStudentStatistics } from "./specialRegimeStudent";



@Resolver()
export class StatisticResolver {
  constructor(private readonly statisticsService: StatisticsService) {}

///////////////////////////////////////////// STAT STUDENTS ////////////////////////////////////////////////////////
  @Query(() => [StudentStatistics])
  async getStudentStatisticsAnglophone(): Promise<StudentStatistics[]> {
    return this.statisticsService.getStudentStatisticsAnglophone();
  }

  @Query(() => [StudentStatistics])
  async getStudentStatisticsFrancophone(): Promise<StudentStatistics[]> {
    return this.statisticsService.getStudentStatisticsFrancophone();
  }

  @Query(()=>[TOTALTABLETWO])
  async getTotalStudentStatisticsFrancophone(){
     
    const MONTANT_ATTENDU=(await this.getStudentStatisticsFrancophone())
    .map(a=>a.amountExpected).length>0?(await this.getStudentStatisticsFrancophone())
    .map(a=>a.amountExpected).reduce(function(a,b){return a+b}):0
    const MONTANT_EN_CAISSE=(await this.getStudentStatisticsFrancophone())
    .map(a=>a.amountPaid).length>0?(await this.getStudentStatisticsFrancophone())
    .map(a=>a.amountPaid).reduce(function(a,b){return a+b}):0
    const TAUX_ENCAISSEMENT=(await this.getStudentStatisticsFrancophone())
    .map(a=>a.collectionRate).length>0?(await this.getStudentStatisticsFrancophone())
    .map(a=>a.collectionRate).reduce(function(a,b){return a+b}):0
    const RESTE_RECOUVRER=(await this.getStudentStatisticsFrancophone())
    .map(a=>a.restToPay).length>0?(await this.getStudentStatisticsFrancophone())
    .map(a=>a.restToPay).reduce(function(a,b){return a+b}):0
    const TAUX_RAR=(await this.getStudentStatisticsFrancophone())
    .map(a=>a.rateArrears).length>0?(await this.getStudentStatisticsFrancophone())
    .map(a=>a.rateArrears).reduce(function(a,b){return a+b}):0

    const T: TOTALTABLETWO[] = [];
    T.push({
      MONTANT_ATTENDU,
      MONTANT_EN_CAISSE,
      TAUX_ENCAISSEMENT,
      RESTE_RECOUVRER,
      TAUX_RAR 
    })
    return T
  }

  @Query(()=>[TOTALTABLETWO])
  async getTotalStudentStatisticsAnglophone(){
     
    const MONTANT_ATTENDU=(await this.getStudentStatisticsAnglophone())
    .map(a=>a.amountExpected).length>0?(await this.getStudentStatisticsAnglophone())
    .map(a=>a.amountExpected).reduce(function(a,b){return a+b}):0
    const MONTANT_EN_CAISSE=(await this.getStudentStatisticsAnglophone())
    .map(a=>a.amountPaid).length>0?(await this.getStudentStatisticsAnglophone())
    .map(a=>a.amountPaid).reduce(function(a,b){return a+b}):0
    const TAUX_ENCAISSEMENT=(await this.getStudentStatisticsAnglophone())
    .map(a=>a.collectionRate).length>0?(await this.getStudentStatisticsAnglophone())
    .map(a=>a.collectionRate).reduce(function(a,b){return a+b}):0
    const RESTE_RECOUVRER=(await this.getStudentStatisticsAnglophone())
    .map(a=>a.restToPay).length>0?(await this.getStudentStatisticsAnglophone())
    .map(a=>a.restToPay).reduce(function(a,b){return a+b}):0
    const TAUX_RAR=(await this.getStudentStatisticsAnglophone())
    .map(a=>a.rateArrears).length>0?(await this.getStudentStatisticsAnglophone())
    .map(a=>a.rateArrears).reduce(function(a,b){return a+b}):0

    const T: TOTALTABLETWO[] = [];
    T.push({
      MONTANT_ATTENDU,
      MONTANT_EN_CAISSE,
      TAUX_ENCAISSEMENT,
      RESTE_RECOUVRER,
      TAUX_RAR 
    })
    return T
  }
  

  @Query(()=>[TOTALTABLETWO])
  async getTotalMaxStudentStatistics(){
     
    const MONTANT_ATTENDU=(await this.getTotalStudentStatisticsAnglophone())
    .map(a=>a.MONTANT_ATTENDU)[0] + (await this.getTotalStudentStatisticsFrancophone())
    .map(a=>a.MONTANT_ATTENDU)[0]
    const MONTANT_EN_CAISSE=(await this.getTotalStudentStatisticsAnglophone())
    .map(a=>a.MONTANT_EN_CAISSE)[0] + (await this.getTotalStudentStatisticsFrancophone())
    .map(a=>a.MONTANT_EN_CAISSE)[0]
    const TAUX_ENCAISSEMENT=(await this.getTotalStudentStatisticsAnglophone())
    .map(a=>a.TAUX_ENCAISSEMENT)[0] + (await this.getTotalStudentStatisticsFrancophone())
    .map(a=>a.TAUX_ENCAISSEMENT)[0]
    const RESTE_RECOUVRER=(await this.getTotalStudentStatisticsAnglophone())
    .map(a=>a.RESTE_RECOUVRER)[0] + (await this.getTotalStudentStatisticsFrancophone())
    .map(a=>a.RESTE_RECOUVRER)[0]
    const TAUX_RAR=(await this.getTotalStudentStatisticsAnglophone())
    .map(a=>a.TAUX_RAR)[0] + (await this.getTotalStudentStatisticsFrancophone())
    .map(a=>a.TAUX_RAR)[0]
    const T: TOTALTABLETWO[] = [];
    T.push({
      MONTANT_ATTENDU,
      MONTANT_EN_CAISSE,
      TAUX_ENCAISSEMENT,
      RESTE_RECOUVRER,
      TAUX_RAR 
    })
    return T
  }

 
//////////////////////////////////////////////// EXTRAS /////////////////////////////////////////////////////////
  @Query(() => [SpecialStudentStatistics])
  async getTrancheStatisticsForSpecialStudents(): Promise<SpecialStudentStatistics[]> {
    return this.statisticsService.getTrancheStatisticsForSpecialStudents();
  }

  @Query(() => Number)
  async numberOfStudentsStartedPayingAdmissionFeeSalleAnglophone(@Args('sallename') sallename:string) {
    return await this.statisticsService.numberOfStudentsStartedPayingAdmissionFeeSalleAnglophone(sallename);
  }

  @Query(() => Number)
  async numberOfStudentsStartedPayingPension() {
    return await this.statisticsService.numberOfStudentsStartedPayingPension();
  }

  // @Query(() => [SectionStatistics])
  // getGeneralSectionStatistics(): Promise<SectionStatistics[]> {
  //   return this.statisticsService.getGeneralSectionStatistics()
  // }
////////////////////////////////////// POUR LA DEUXIEME TRANCHE TABLE T1 ANGLOPHONE ET FRANCOPHONE////////////////////////

@Query(() => [SectionStatistics])
getSectionStatisticsAnglophoneSecondInstalment(): Promise<SectionStatistics[]> {
  return this.statisticsService.getSectionStatisticsAnglophoneSecondInstalment();
}

@Query(() => [SectionStatistics])
getSectionStatisticsFrancophoneSecondInstalment(): Promise<SectionStatistics[]> {
  return this.statisticsService.getSectionStatisticsFrancophoneSecondInstalment();
}

@Query(()=>[TOTALTABLEONE])
 async TotalSectionStatisticsFrancophoneSecondInstalmentFee(){
  const TOTAL_EFFECTIFS_ENREGISTRES = (await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.numberOfStudents).length>0?(await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.numberOfStudents).reduce(function(a,b){return a+b}):0
  const TOTAL_MONTANT_ATTENDU = (await this.getSectionStatisticsFrancophoneSecondInstalment())
      .map(a=>a.expectedAmount).length>0?(await this.getSectionStatisticsFrancophoneSecondInstalment())
      .map(a=>a.expectedAmount).reduce(function(a,b){return a+b}):0
  const TOTAL_MONTANT_EN_CAISSE = (await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.sumAmountAlreadyPaid).length>0?(await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.sumAmountAlreadyPaid).reduce(function(a,b){return a+b}):0
  const TOTAL_NOMBRE_ENCAISSEMENT=(await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.numberOfStudentsStartedPaying).length>0?(await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.numberOfStudentsStartedPaying).reduce(function(a,b){return a+b}):0
  const TOTAL_NOMBRE_SANS_ENCAISSEMENT = (await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.numberOfStudentsNotPaid).length>0?(await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.numberOfStudentsNotPaid).reduce(function(a,b){return a+b}):0
  const TOTAL_FIRST_TAUX_ENCAISSEMENT = (await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.TAUXA).length>0?(await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.TAUXA).reduce(function(a,b){return a+b}):0
  const TOTAL_SECOND_TAUX_ENCAISSEMENT=(await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.TAUXB).length>0?(await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.TAUXB).reduce(function(a,b){return a+b}):0
  const TOTAL_RESTE_A_RECOUVRER=(await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.amountRest).length>0?(await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.amountRest).reduce(function(a,b){return a+b}):0
  const TOTAL_FIRST_TAUX_RECOUVRIR=(await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.TAUXC).length>0?(await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.TAUXC).reduce(function(a,b){return a+b}):0
  const TOTAL_SECOND_TAUX_RECOUVRIR=(await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.TAUXD).length>0?(await this.getSectionStatisticsFrancophoneSecondInstalment())
  .map(a=>a.TAUXD).reduce(function(a,b){return a+b}):0

  const T: TOTALTABLEONE[] = [];
  T.push({
TOTAL_EFFECTIFS_ENREGISTRES,
TOTAL_MONTANT_ATTENDU,
TOTAL_NOMBRE_ENCAISSEMENT,
TOTAL_NOMBRE_SANS_ENCAISSEMENT,
TOTAL_MONTANT_EN_CAISSE,
TOTAL_FIRST_TAUX_ENCAISSEMENT,
TOTAL_SECOND_TAUX_ENCAISSEMENT,
TOTAL_RESTE_A_RECOUVRER,
TOTAL_FIRST_TAUX_RECOUVRIR,
TOTAL_SECOND_TAUX_RECOUVRIR
  })
  return T

 }

 @Query(()=>[TOTALTABLEONE])
 async TotalSectionStatisticsAnglophoneSecondInstalmentFee(){
  const TOTAL_EFFECTIFS_ENREGISTRES = (await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.numberOfStudents).length>0?(await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.numberOfStudents).reduce(function(a,b){return a+b}):0
  const TOTAL_MONTANT_ATTENDU = (await this.getSectionStatisticsAnglophoneSecondInstalment())
      .map(a=>a.expectedAmount).length>0?(await this.getSectionStatisticsAnglophoneSecondInstalment())
      .map(a=>a.expectedAmount).reduce(function(a,b){return a+b}):0
  const TOTAL_MONTANT_EN_CAISSE = (await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.sumAmountAlreadyPaid).length>0?(await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.sumAmountAlreadyPaid).reduce(function(a,b){return a+b}):0
  const TOTAL_NOMBRE_ENCAISSEMENT=(await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.numberOfStudentsStartedPaying).length>0?(await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.numberOfStudentsStartedPaying).reduce(function(a,b){return a+b}):0
  const TOTAL_NOMBRE_SANS_ENCAISSEMENT = (await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.numberOfStudentsNotPaid).length>0?(await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.numberOfStudentsNotPaid).reduce(function(a,b){return a+b}):0
  const TOTAL_FIRST_TAUX_ENCAISSEMENT = (await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.TAUXA).length>0?(await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.TAUXA).reduce(function(a,b){return a+b}):0
  const TOTAL_SECOND_TAUX_ENCAISSEMENT=(await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.TAUXB).length>0?(await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.TAUXB).reduce(function(a,b){return a+b}):0
  const TOTAL_RESTE_A_RECOUVRER=(await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.amountRest).length>0?(await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.amountRest).reduce(function(a,b){return a+b}):0
  const TOTAL_FIRST_TAUX_RECOUVRIR=(await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.TAUXC).length>0?(await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.TAUXC).reduce(function(a,b){return a+b}):0
  const TOTAL_SECOND_TAUX_RECOUVRIR=(await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.TAUXD).length>0?(await this.getSectionStatisticsAnglophoneSecondInstalment())
  .map(a=>a.TAUXD).reduce(function(a,b){return a+b}):0

  const T: TOTALTABLEONE[] = [];
  T.push({
TOTAL_EFFECTIFS_ENREGISTRES,
TOTAL_MONTANT_ATTENDU,
TOTAL_NOMBRE_ENCAISSEMENT,
TOTAL_NOMBRE_SANS_ENCAISSEMENT,
TOTAL_MONTANT_EN_CAISSE,
TOTAL_FIRST_TAUX_ENCAISSEMENT,
TOTAL_SECOND_TAUX_ENCAISSEMENT,
TOTAL_RESTE_A_RECOUVRER,
TOTAL_FIRST_TAUX_RECOUVRIR,
TOTAL_SECOND_TAUX_RECOUVRIR
  })
  return T

 }

 @Query(() => [TOTALTABLEONE])
  async TotalMAX_T_ONE_SecondInstalmentFee(){
    const TOTAL_EFFECTIFS_ENREGISTRES = (await this.TotalSectionStatisticsAnglophoneSecondInstalmentFee())
      .map(a=>a.TOTAL_EFFECTIFS_ENREGISTRES)[0] + (await this.TotalSectionStatisticsFrancophoneSecondInstalmentFee())
      .map(a=>a.TOTAL_EFFECTIFS_ENREGISTRES)[0]
    const TOTAL_MONTANT_ATTENDU = (await this.TotalSectionStatisticsAnglophoneSecondInstalmentFee())
      .map(a=>a.TOTAL_MONTANT_ATTENDU)[0]+(await this.TotalSectionStatisticsFrancophoneSecondInstalmentFee())
      .map(a=>a.TOTAL_MONTANT_ATTENDU)[0]
    const TOTAL_MONTANT_EN_CAISSE = (await this.TotalSectionStatisticsAnglophoneSecondInstalmentFee())
      .map(a=>a.TOTAL_MONTANT_EN_CAISSE)[0]+(await this.TotalSectionStatisticsFrancophoneSecondInstalmentFee())
      .map(a=>a.TOTAL_MONTANT_EN_CAISSE)[0]
    const TOTAL_NOMBRE_ENCAISSEMENT= (await this.TotalSectionStatisticsAnglophoneSecondInstalmentFee())
    .map(a=>a.TOTAL_NOMBRE_ENCAISSEMENT)[0]+(await this.TotalSectionStatisticsFrancophoneSecondInstalmentFee())
    .map(a=>a.TOTAL_NOMBRE_ENCAISSEMENT)[0]
    const TOTAL_NOMBRE_SANS_ENCAISSEMENT= (await this.TotalSectionStatisticsAnglophoneSecondInstalmentFee())
    .map(a=>a.TOTAL_NOMBRE_SANS_ENCAISSEMENT)[0]+(await this.TotalSectionStatisticsFrancophoneSecondInstalmentFee())
    .map(a=>a.TOTAL_NOMBRE_SANS_ENCAISSEMENT)[0]
    const TOTAL_FIRST_TAUX_ENCAISSEMENT = (await this.TotalSectionStatisticsAnglophoneSecondInstalmentFee())
      .map(a=>a.TOTAL_FIRST_TAUX_ENCAISSEMENT)[0]+(await this.TotalSectionStatisticsFrancophoneSecondInstalmentFee())
      .map(a=>a.TOTAL_FIRST_TAUX_ENCAISSEMENT)[0]
    const TOTAL_RESTE_A_RECOUVRER=(await this.TotalSectionStatisticsAnglophoneSecondInstalmentFee())
      .map(a=>a.TOTAL_RESTE_A_RECOUVRER)[0]+(await this.TotalSectionStatisticsFrancophoneSecondInstalmentFee())
      .map(a=>a.TOTAL_RESTE_A_RECOUVRER)[0]
    const TOTAL_SECOND_TAUX_ENCAISSEMENT =(await this.TotalSectionStatisticsAnglophoneSecondInstalmentFee())
      .map(a=>a.TOTAL_SECOND_TAUX_ENCAISSEMENT)[0]+(await this.TotalSectionStatisticsFrancophoneSecondInstalmentFee())
      .map(a=>a.TOTAL_SECOND_TAUX_ENCAISSEMENT)[0]
    const TOTAL_FIRST_TAUX_RECOUVRIR=(await this.TotalSectionStatisticsAnglophoneSecondInstalmentFee())
    .map(a=>a.TOTAL_FIRST_TAUX_RECOUVRIR)[0]+(await this.TotalSectionStatisticsFrancophoneSecondInstalmentFee())
    .map(a=>a.TOTAL_FIRST_TAUX_RECOUVRIR)[0]
    const TOTAL_SECOND_TAUX_RECOUVRIR=(await this.TotalSectionStatisticsAnglophoneSecondInstalmentFee())
    .map(a=>a.TOTAL_SECOND_TAUX_RECOUVRIR)[0]+(await this.TotalSectionStatisticsFrancophoneSecondInstalmentFee())
    .map(a=>a.TOTAL_SECOND_TAUX_RECOUVRIR)[0]
      const T: TOTALTABLEONE[] = [];
      T.push({
    TOTAL_EFFECTIFS_ENREGISTRES,
    TOTAL_MONTANT_ATTENDU,
    TOTAL_NOMBRE_ENCAISSEMENT,
    TOTAL_NOMBRE_SANS_ENCAISSEMENT,
    TOTAL_MONTANT_EN_CAISSE,
    TOTAL_FIRST_TAUX_ENCAISSEMENT,
    TOTAL_SECOND_TAUX_ENCAISSEMENT,
    TOTAL_RESTE_A_RECOUVRER,
    TOTAL_FIRST_TAUX_RECOUVRIR,
    TOTAL_SECOND_TAUX_RECOUVRIR
      })
      return T
  }


////////////////////////////////////// POUR LA PREMIERE TRANCHE TABLE T1 ANGLOPHONE ET FRANCOPHONE////////////////////////
   @Query(() => [SectionStatistics])
   async getSectionStatisticsAnglophoneFirstInstalment(): Promise<SectionStatistics[]> {
     return this.statisticsService.getSectionStatisticsAnglophoneFirstInstalment();
   }
 
   @Query(() => [SectionStatistics])
   getSectionStatisticsFrancophoneFirstInstalment(): Promise<SectionStatistics[]> {
     return this.statisticsService.getSectionStatisticsFrancophomeFirstInstalment();
   }

 @Query(()=>[TOTALTABLEONE])
 async TotalSectionStatisticsFrancophoneFirstInstalmentFee(){
  const TOTAL_EFFECTIFS_ENREGISTRES = (await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.numberOfStudents).length>0?(await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.numberOfStudents).reduce(function(a,b){return a+b}):0
  const TOTAL_MONTANT_ATTENDU = (await this.getSectionStatisticsFrancophoneFirstInstalment())
      .map(a=>a.expectedAmount).length>0?(await this.getSectionStatisticsFrancophoneFirstInstalment())
      .map(a=>a.expectedAmount).reduce(function(a,b){return a+b}):0
  const TOTAL_MONTANT_EN_CAISSE = (await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.sumAmountAlreadyPaid).length>0?(await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.sumAmountAlreadyPaid).reduce(function(a,b){return a+b}):0
  const TOTAL_NOMBRE_ENCAISSEMENT=(await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.numberOfStudentsStartedPaying).length>0?(await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.numberOfStudentsStartedPaying).reduce(function(a,b){return a+b}):0
  const TOTAL_NOMBRE_SANS_ENCAISSEMENT = (await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.numberOfStudentsNotPaid).length>0?(await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.numberOfStudentsNotPaid).reduce(function(a,b){return a+b}):0
  const TOTAL_FIRST_TAUX_ENCAISSEMENT = (await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.TAUXA).length>0?(await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.TAUXA).reduce(function(a,b){return a+b}):0
  const TOTAL_SECOND_TAUX_ENCAISSEMENT=(await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.TAUXB).length>0?(await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.TAUXB).reduce(function(a,b){return a+b}):0
  const TOTAL_RESTE_A_RECOUVRER=(await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.amountRest).length>0?(await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.amountRest).reduce(function(a,b){return a+b}):0
  const TOTAL_FIRST_TAUX_RECOUVRIR=(await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.TAUXC).length>0?(await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.TAUXC).reduce(function(a,b){return a+b}):0
  const TOTAL_SECOND_TAUX_RECOUVRIR=(await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.TAUXD).length>0?(await this.getSectionStatisticsFrancophoneFirstInstalment())
  .map(a=>a.TAUXD).reduce(function(a,b){return a+b}):0

  const T: TOTALTABLEONE[] = [];
  T.push({
TOTAL_EFFECTIFS_ENREGISTRES,
TOTAL_MONTANT_ATTENDU,
TOTAL_NOMBRE_ENCAISSEMENT,
TOTAL_NOMBRE_SANS_ENCAISSEMENT,
TOTAL_MONTANT_EN_CAISSE,
TOTAL_FIRST_TAUX_ENCAISSEMENT,
TOTAL_SECOND_TAUX_ENCAISSEMENT,
TOTAL_RESTE_A_RECOUVRER,
TOTAL_FIRST_TAUX_RECOUVRIR,
TOTAL_SECOND_TAUX_RECOUVRIR
  })
  return T

 }

 @Query(()=>[TOTALTABLEONE])
 async TotalSectionStatisticsAnglophoneFirstInstalmentFee(){
  const TOTAL_EFFECTIFS_ENREGISTRES = (await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.numberOfStudents).length>0?(await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.numberOfStudents).reduce(function(a,b){return a+b}):0
  const TOTAL_MONTANT_ATTENDU = (await this.getSectionStatisticsAnglophoneFirstInstalment())
      .map(a=>a.expectedAmount).length>0?(await this.getSectionStatisticsAnglophoneFirstInstalment())
      .map(a=>a.expectedAmount).reduce(function(a,b){return a+b}):0
  const TOTAL_MONTANT_EN_CAISSE = (await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.sumAmountAlreadyPaid).length>0?(await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.sumAmountAlreadyPaid).reduce(function(a,b){return a+b}):0
  const TOTAL_NOMBRE_ENCAISSEMENT=(await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.numberOfStudentsStartedPaying).length>0?(await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.numberOfStudentsStartedPaying).reduce(function(a,b){return a+b}):0
  const TOTAL_NOMBRE_SANS_ENCAISSEMENT = (await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.numberOfStudentsNotPaid).length>0?(await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.numberOfStudentsNotPaid).reduce(function(a,b){return a+b}):0
  const TOTAL_FIRST_TAUX_ENCAISSEMENT = (await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.TAUXA).length>0?(await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.TAUXA).reduce(function(a,b){return a+b}):0
  const TOTAL_SECOND_TAUX_ENCAISSEMENT=(await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.TAUXB).length>0?(await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.TAUXB).reduce(function(a,b){return a+b}):0
  const TOTAL_RESTE_A_RECOUVRER=(await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.amountRest).length>0?(await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.amountRest).reduce(function(a,b){return a+b}):0
  const TOTAL_FIRST_TAUX_RECOUVRIR=(await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.TAUXC).length>0?(await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.TAUXC).reduce(function(a,b){return a+b}):0
  const TOTAL_SECOND_TAUX_RECOUVRIR=(await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.TAUXD).length>0?(await this.getSectionStatisticsAnglophoneFirstInstalment())
  .map(a=>a.TAUXD).reduce(function(a,b){return a+b}):0

  const T: TOTALTABLEONE[] = [];
  T.push({
TOTAL_EFFECTIFS_ENREGISTRES,
TOTAL_MONTANT_ATTENDU,
TOTAL_NOMBRE_ENCAISSEMENT,
TOTAL_NOMBRE_SANS_ENCAISSEMENT,
TOTAL_MONTANT_EN_CAISSE,
TOTAL_FIRST_TAUX_ENCAISSEMENT,
TOTAL_SECOND_TAUX_ENCAISSEMENT,
TOTAL_RESTE_A_RECOUVRER,
TOTAL_FIRST_TAUX_RECOUVRIR,
TOTAL_SECOND_TAUX_RECOUVRIR
  })
  return T

 }

 @Query(() => [TOTALTABLEONE])
  async TotalMAX_T_ONE_FirstInstalmentFee(){
    const TOTAL_EFFECTIFS_ENREGISTRES = (await this.TotalSectionStatisticsAnglophoneFirstInstalmentFee())
      .map(a=>a.TOTAL_EFFECTIFS_ENREGISTRES)[0] + (await this.TotalSectionStatisticsFrancophoneFirstInstalmentFee())
      .map(a=>a.TOTAL_EFFECTIFS_ENREGISTRES)[0]
    const TOTAL_MONTANT_ATTENDU = (await this.TotalSectionStatisticsAnglophoneFirstInstalmentFee())
      .map(a=>a.TOTAL_MONTANT_ATTENDU)[0]+(await this.TotalSectionStatisticsFrancophoneFirstInstalmentFee())
      .map(a=>a.TOTAL_MONTANT_ATTENDU)[0]
    const TOTAL_MONTANT_EN_CAISSE = (await this.TotalSectionStatisticsAnglophoneFirstInstalmentFee())
      .map(a=>a.TOTAL_MONTANT_EN_CAISSE)[0]+(await this.TotalSectionStatisticsFrancophoneFirstInstalmentFee())
      .map(a=>a.TOTAL_MONTANT_EN_CAISSE)[0]
    const TOTAL_NOMBRE_ENCAISSEMENT= (await this.TotalSectionStatisticsAnglophoneFirstInstalmentFee())
    .map(a=>a.TOTAL_NOMBRE_ENCAISSEMENT)[0]+(await this.TotalSectionStatisticsFrancophoneFirstInstalmentFee())
    .map(a=>a.TOTAL_NOMBRE_ENCAISSEMENT)[0]
    const TOTAL_NOMBRE_SANS_ENCAISSEMENT= (await this.TotalSectionStatisticsAnglophoneFirstInstalmentFee())
    .map(a=>a.TOTAL_NOMBRE_SANS_ENCAISSEMENT)[0]+(await this.TotalSectionStatisticsFrancophoneFirstInstalmentFee())
    .map(a=>a.TOTAL_NOMBRE_SANS_ENCAISSEMENT)[0]
    const TOTAL_FIRST_TAUX_ENCAISSEMENT = (await this.TotalSectionStatisticsAnglophoneFirstInstalmentFee())
      .map(a=>a.TOTAL_FIRST_TAUX_ENCAISSEMENT)[0]+(await this.TotalSectionStatisticsFrancophoneFirstInstalmentFee())
      .map(a=>a.TOTAL_FIRST_TAUX_ENCAISSEMENT)[0]
    const TOTAL_RESTE_A_RECOUVRER=(await this.TotalSectionStatisticsAnglophoneFirstInstalmentFee())
      .map(a=>a.TOTAL_RESTE_A_RECOUVRER)[0]+(await this.TotalSectionStatisticsFrancophoneFirstInstalmentFee())
      .map(a=>a.TOTAL_RESTE_A_RECOUVRER)[0]
    const TOTAL_SECOND_TAUX_ENCAISSEMENT =(await this.TotalSectionStatisticsAnglophoneFirstInstalmentFee())
      .map(a=>a.TOTAL_SECOND_TAUX_ENCAISSEMENT)[0]+(await this.TotalSectionStatisticsFrancophoneFirstInstalmentFee())
      .map(a=>a.TOTAL_SECOND_TAUX_ENCAISSEMENT)[0]
    const TOTAL_FIRST_TAUX_RECOUVRIR=(await this.TotalSectionStatisticsAnglophoneFirstInstalmentFee())
    .map(a=>a.TOTAL_FIRST_TAUX_RECOUVRIR)[0]+(await this.TotalSectionStatisticsFrancophoneFirstInstalmentFee())
    .map(a=>a.TOTAL_FIRST_TAUX_RECOUVRIR)[0]
    const TOTAL_SECOND_TAUX_RECOUVRIR=(await this.TotalSectionStatisticsAnglophoneFirstInstalmentFee())
    .map(a=>a.TOTAL_SECOND_TAUX_RECOUVRIR)[0]+(await this.TotalSectionStatisticsFrancophoneFirstInstalmentFee())
    .map(a=>a.TOTAL_SECOND_TAUX_RECOUVRIR)[0]
      const T: TOTALTABLEONE[] = [];
      T.push({
    TOTAL_EFFECTIFS_ENREGISTRES,
    TOTAL_MONTANT_ATTENDU,
    TOTAL_NOMBRE_ENCAISSEMENT,
    TOTAL_NOMBRE_SANS_ENCAISSEMENT,
    TOTAL_MONTANT_EN_CAISSE,
    TOTAL_FIRST_TAUX_ENCAISSEMENT,
    TOTAL_SECOND_TAUX_ENCAISSEMENT,
    TOTAL_RESTE_A_RECOUVRER,
    TOTAL_FIRST_TAUX_RECOUVRIR,
    TOTAL_SECOND_TAUX_RECOUVRIR
      })
      return T
  }

   
 ////////////////////////////////////// POUR L'INSCRIPTION TABLE T1 ANGLOPHONE ET FRANCOPHONE////////////////////////

 @Query(() => [SectionStatistics])
 async getSectionStatisticsAnglophoneAdmissionFee(): Promise<SectionStatistics[]> {
   return this.statisticsService.getSectionStatisticsAnglophoneAdmissionFee();
 }

 @Query(() => [SectionStatistics])
 getSectionStatisticsFrancophoneAdmissionFee(): Promise<SectionStatistics[]> {
   return this.statisticsService.getSectionStatisticsFrancophoneAdmissionFee();
 }
 @Query(()=>[TOTALTABLEONE])
 async TotalSectionStatisticsFrancophoneAdmissionFee(){
  const TOTAL_EFFECTIFS_ENREGISTRES = (await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.numberOfStudents).length>0?(await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.numberOfStudents).reduce(function(a,b){return a+b}):0
  const TOTAL_MONTANT_ATTENDU = (await this.getSectionStatisticsFrancophoneAdmissionFee())
      .map(a=>a.expectedAmount).length>0?(await this.getSectionStatisticsFrancophoneAdmissionFee())
      .map(a=>a.expectedAmount).reduce(function(a,b){return a+b}):0
  const TOTAL_MONTANT_EN_CAISSE = (await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.sumAmountAlreadyPaid).length>0?(await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.sumAmountAlreadyPaid).reduce(function(a,b){return a+b}):0
  const TOTAL_NOMBRE_ENCAISSEMENT=(await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.numberOfStudentsStartedPaying).length>0?(await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.numberOfStudentsStartedPaying).reduce(function(a,b){return a+b}):0
  const TOTAL_NOMBRE_SANS_ENCAISSEMENT = (await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.numberOfStudentsNotPaid).length>0?(await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.numberOfStudentsNotPaid).reduce(function(a,b){return a+b}):0
  const TOTAL_FIRST_TAUX_ENCAISSEMENT = (await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.TAUXA).length>0?(await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.TAUXA).reduce(function(a,b){return a+b}):0
  const TOTAL_SECOND_TAUX_ENCAISSEMENT=(await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.TAUXB).length>0?(await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.TAUXB).reduce(function(a,b){return a+b}):0
  const TOTAL_RESTE_A_RECOUVRER=(await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.amountRest).length>0?(await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.amountRest).reduce(function(a,b){return a+b}):0
  const TOTAL_FIRST_TAUX_RECOUVRIR=(await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.TAUXC).length>0?(await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.TAUXC).reduce(function(a,b){return a+b}):0
  const TOTAL_SECOND_TAUX_RECOUVRIR=(await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.TAUXD).length>0?(await this.getSectionStatisticsFrancophoneAdmissionFee())
  .map(a=>a.TAUXD).reduce(function(a,b){return a+b}):0

  const T: TOTALTABLEONE[] = [];
  T.push({
TOTAL_EFFECTIFS_ENREGISTRES,
TOTAL_MONTANT_ATTENDU,
TOTAL_NOMBRE_ENCAISSEMENT,
TOTAL_NOMBRE_SANS_ENCAISSEMENT,
TOTAL_MONTANT_EN_CAISSE,
TOTAL_FIRST_TAUX_ENCAISSEMENT,
TOTAL_SECOND_TAUX_ENCAISSEMENT,
TOTAL_RESTE_A_RECOUVRER,
TOTAL_FIRST_TAUX_RECOUVRIR,
TOTAL_SECOND_TAUX_RECOUVRIR
  })
  return T

 }

 @Query(()=>[TOTALTABLEONE])
 async TotalSectionStatisticsAnglophoneAdmissionFee(){
  const TOTAL_EFFECTIFS_ENREGISTRES = (await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.numberOfStudents).length>0?(await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.numberOfStudents).reduce(function(a,b){return a+b}):0
  const TOTAL_MONTANT_ATTENDU = (await this.getSectionStatisticsAnglophoneAdmissionFee())
      .map(a=>a.expectedAmount).length>0?(await this.getSectionStatisticsAnglophoneAdmissionFee())
      .map(a=>a.expectedAmount).reduce(function(a,b){return a+b}):0
  const TOTAL_MONTANT_EN_CAISSE = (await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.sumAmountAlreadyPaid).length>0?(await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.sumAmountAlreadyPaid).reduce(function(a,b){return a+b}):0
  const TOTAL_NOMBRE_ENCAISSEMENT=(await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.numberOfStudentsStartedPaying).length>0?(await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.numberOfStudentsStartedPaying).reduce(function(a,b){return a+b}):0
  const TOTAL_NOMBRE_SANS_ENCAISSEMENT = (await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.numberOfStudentsNotPaid).length>0?(await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.numberOfStudentsNotPaid).reduce(function(a,b){return a+b}):0
  const TOTAL_FIRST_TAUX_ENCAISSEMENT = (await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.TAUXA).length>0?(await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.TAUXA).reduce(function(a,b){return a+b}):0
  const TOTAL_SECOND_TAUX_ENCAISSEMENT=(await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.TAUXB).length>0?(await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.TAUXB).reduce(function(a,b){return a+b}):0
  const TOTAL_RESTE_A_RECOUVRER=(await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.amountRest).length>0?(await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.amountRest).reduce(function(a,b){return a+b}):0
  const TOTAL_FIRST_TAUX_RECOUVRIR=(await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.TAUXC).length>0?(await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.TAUXC).reduce(function(a,b){return a+b}):0
  const TOTAL_SECOND_TAUX_RECOUVRIR=(await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.TAUXD).length>0?(await this.getSectionStatisticsAnglophoneAdmissionFee())
  .map(a=>a.TAUXD).reduce(function(a,b){return a+b}):0

  const T: TOTALTABLEONE[] = [];
  T.push({
TOTAL_EFFECTIFS_ENREGISTRES,
TOTAL_MONTANT_ATTENDU,
TOTAL_NOMBRE_ENCAISSEMENT,
TOTAL_NOMBRE_SANS_ENCAISSEMENT,
TOTAL_MONTANT_EN_CAISSE,
TOTAL_FIRST_TAUX_ENCAISSEMENT,
TOTAL_SECOND_TAUX_ENCAISSEMENT,
TOTAL_RESTE_A_RECOUVRER,
TOTAL_FIRST_TAUX_RECOUVRIR,
TOTAL_SECOND_TAUX_RECOUVRIR
  })
  return T

 }

 @Query(() => [TOTALTABLEONE])
  async TotalMAX_T_ONE_Admission(){
    const TOTAL_EFFECTIFS_ENREGISTRES = (await this.TotalSectionStatisticsAnglophoneAdmissionFee())
      .map(a=>a.TOTAL_EFFECTIFS_ENREGISTRES)[0] + (await this.TotalSectionStatisticsFrancophoneAdmissionFee())
      .map(a=>a.TOTAL_EFFECTIFS_ENREGISTRES)[0]
    const TOTAL_MONTANT_ATTENDU = (await this.TotalSectionStatisticsAnglophoneAdmissionFee())
      .map(a=>a.TOTAL_MONTANT_ATTENDU)[0]+(await this.TotalSectionStatisticsFrancophoneAdmissionFee())
      .map(a=>a.TOTAL_MONTANT_ATTENDU)[0]
    const TOTAL_MONTANT_EN_CAISSE = (await this.TotalSectionStatisticsAnglophoneAdmissionFee())
      .map(a=>a.TOTAL_MONTANT_EN_CAISSE)[0]+(await this.TotalSectionStatisticsFrancophoneAdmissionFee())
      .map(a=>a.TOTAL_MONTANT_EN_CAISSE)[0]
    const TOTAL_NOMBRE_ENCAISSEMENT= (await this.TotalSectionStatisticsAnglophoneAdmissionFee())
    .map(a=>a.TOTAL_NOMBRE_ENCAISSEMENT)[0]+(await this.TotalSectionStatisticsFrancophoneAdmissionFee())
    .map(a=>a.TOTAL_NOMBRE_ENCAISSEMENT)[0]
    const TOTAL_NOMBRE_SANS_ENCAISSEMENT= (await this.TotalSectionStatisticsAnglophoneAdmissionFee())
    .map(a=>a.TOTAL_NOMBRE_SANS_ENCAISSEMENT)[0]+(await this.TotalSectionStatisticsFrancophoneAdmissionFee())
    .map(a=>a.TOTAL_NOMBRE_SANS_ENCAISSEMENT)[0]
    const TOTAL_FIRST_TAUX_ENCAISSEMENT = (await this.TotalSectionStatisticsAnglophoneAdmissionFee())
      .map(a=>a.TOTAL_FIRST_TAUX_ENCAISSEMENT)[0]+(await this.TotalSectionStatisticsFrancophoneAdmissionFee())
      .map(a=>a.TOTAL_FIRST_TAUX_ENCAISSEMENT)[0]
    const TOTAL_RESTE_A_RECOUVRER=(await this.TotalSectionStatisticsAnglophoneAdmissionFee())
      .map(a=>a.TOTAL_RESTE_A_RECOUVRER)[0]+(await this.TotalSectionStatisticsFrancophoneAdmissionFee())
      .map(a=>a.TOTAL_RESTE_A_RECOUVRER)[0]
    const TOTAL_SECOND_TAUX_ENCAISSEMENT =(await this.TotalSectionStatisticsAnglophoneAdmissionFee())
      .map(a=>a.TOTAL_SECOND_TAUX_ENCAISSEMENT)[0]+(await this.TotalSectionStatisticsFrancophoneAdmissionFee())
      .map(a=>a.TOTAL_SECOND_TAUX_ENCAISSEMENT)[0]
    const TOTAL_FIRST_TAUX_RECOUVRIR=(await this.TotalSectionStatisticsAnglophoneAdmissionFee())
    .map(a=>a.TOTAL_FIRST_TAUX_RECOUVRIR)[0]+(await this.TotalSectionStatisticsFrancophoneAdmissionFee())
    .map(a=>a.TOTAL_FIRST_TAUX_RECOUVRIR)[0]
    const TOTAL_SECOND_TAUX_RECOUVRIR=(await this.TotalSectionStatisticsAnglophoneAdmissionFee())
    .map(a=>a.TOTAL_SECOND_TAUX_RECOUVRIR)[0]+(await this.TotalSectionStatisticsFrancophoneAdmissionFee())
    .map(a=>a.TOTAL_SECOND_TAUX_RECOUVRIR)[0]
      const T: TOTALTABLEONE[] = [];
      T.push({
    TOTAL_EFFECTIFS_ENREGISTRES,
    TOTAL_MONTANT_ATTENDU,
    TOTAL_NOMBRE_ENCAISSEMENT,
    TOTAL_NOMBRE_SANS_ENCAISSEMENT,
    TOTAL_MONTANT_EN_CAISSE,
    TOTAL_FIRST_TAUX_ENCAISSEMENT,
    TOTAL_SECOND_TAUX_ENCAISSEMENT,
    TOTAL_RESTE_A_RECOUVRER,
    TOTAL_FIRST_TAUX_RECOUVRIR,
    TOTAL_SECOND_TAUX_RECOUVRIR
      })
      return T
  }



////////////////////////////////////// POUR LES TABLES TO ////////////////////////////////////////////////////////////
  @Query(() => [ClassStatistics])
  getGeneralAnglophoneSectionStatistics(): Promise<ClassStatistics[]> {
    return this.statisticsService.getGeneralAnglophoneClassStatistics()
  }
  @Query(() => [ClassStatistics])
  getGeneralFrancophoneSectionStatistics(): Promise<ClassStatistics[]> {
    return this.statisticsService.getGeneralFrancophoneClassStatistics()
  }

  @Query(() => [TOTAL])
  async TotalGeneralFrancophoneSectionStatistics(){
      const TOTAL_EFFECTIFS_ENREGISTRES = (await this.getGeneralFrancophoneSectionStatistics())
      .map(a=>a.numberOfStudents).length>0?(await this.getGeneralFrancophoneSectionStatistics())
      .map(a=>a.numberOfStudents).reduce(function(a,b){return a+b}):0
      const TOTAL_MONTANT_ATTENDU = (await this.getGeneralFrancophoneSectionStatistics())
      .map(a=>a.expectedAmount).length>0?(await this.getGeneralFrancophoneSectionStatistics())
      .map(a=>a.expectedAmount).reduce(function(a,b){return a+b}):0
      const TOTAL_MONTANT_EN_CAISSE = (await this.getGeneralFrancophoneSectionStatistics())
      .map(a=>a.sumAmountAlreadyPaid).length>0?(await this.getGeneralFrancophoneSectionStatistics())
      .map(a=>a.sumAmountAlreadyPaid).reduce(function(a,b){return a+b}):0
      const TOTAL_TAUX_ENCAISSEMENT = (await this.getGeneralFrancophoneSectionStatistics())
      .map(a=>a.rateT).length>0?(await this.getGeneralFrancophoneSectionStatistics())
      .map(a=>a.rateT).reduce(function(a,b){return a+b}):0
      const TOTAL_RESTE_A_RECOUVRER=(await this.getGeneralFrancophoneSectionStatistics())
      .map(a=>a.amountRest).length>0?(await this.getGeneralFrancophoneSectionStatistics())
      .map(a=>a.amountRest).reduce(function(a,b){return a+b}):0
      const TAUX_RAR =(await this.getGeneralFrancophoneSectionStatistics())
      .map(a=>a.rateZ).length>0?(await this.getGeneralFrancophoneSectionStatistics())
      .map(a=>a.rateZ).reduce(function(a,b){return a+b}):0
    const T: TOTAL[] = [];
    T.push({
      TOTAL_EFFECTIFS_ENREGISTRES,
      TOTAL_MONTANT_ATTENDU,
      TOTAL_MONTANT_EN_CAISSE,
      TOTAL_TAUX_ENCAISSEMENT,
      TOTAL_RESTE_A_RECOUVRER,
      TAUX_RAR
    })
    return T
  }

  @Query(() => [TOTAL])
  async TotalGeneralAnglophoneSectionStatistics(){
      const TOTAL_EFFECTIFS_ENREGISTRES = (await this.getGeneralAnglophoneSectionStatistics())
      .map(a=>a.numberOfStudents).length>0?(await this.getGeneralAnglophoneSectionStatistics())
      .map(a=>a.numberOfStudents).reduce(function(a,b){return a+b}):0
      const TOTAL_MONTANT_ATTENDU = (await this.getGeneralAnglophoneSectionStatistics())
      .map(a=>a.expectedAmount).length>0?(await this.getGeneralAnglophoneSectionStatistics())
      .map(a=>a.expectedAmount).reduce(function(a,b){return a+b}):0
      const TOTAL_MONTANT_EN_CAISSE = (await this.getGeneralAnglophoneSectionStatistics())
      .map(a=>a.sumAmountAlreadyPaid).length>0?(await this.getGeneralAnglophoneSectionStatistics())
      .map(a=>a.sumAmountAlreadyPaid).reduce(function(a,b){return a+b}):0
      const TOTAL_TAUX_ENCAISSEMENT = (await this.getGeneralAnglophoneSectionStatistics())
      .map(a=>a.rateT).length>0?(await this.getGeneralAnglophoneSectionStatistics())
      .map(a=>a.rateT).reduce(function(a,b){return a+b}):0
      const TOTAL_RESTE_A_RECOUVRER=(await this.getGeneralAnglophoneSectionStatistics())
      .map(a=>a.amountRest).length>0?(await this.getGeneralAnglophoneSectionStatistics())
      .map(a=>a.amountRest).reduce(function(a,b){return a+b}):0
      const TAUX_RAR =(await this.getGeneralAnglophoneSectionStatistics())
      .map(a=>a.rateZ).length>0?(await this.getGeneralAnglophoneSectionStatistics())
      .map(a=>a.rateZ).reduce(function(a,b){return a+b}):0
    const T: TOTAL[] = [];
    T.push({
      TOTAL_EFFECTIFS_ENREGISTRES,
      TOTAL_MONTANT_ATTENDU,
      TOTAL_MONTANT_EN_CAISSE,
      TOTAL_TAUX_ENCAISSEMENT,
      TOTAL_RESTE_A_RECOUVRER,
      TAUX_RAR
    })
    return T
  }
  
  @Query(() => [TOTAL])
  async TotalMAX_T_ZERO(){
    const TOTAL_EFFECTIFS_ENREGISTRES = (await this.TotalGeneralAnglophoneSectionStatistics())
      .map(a=>a.TOTAL_EFFECTIFS_ENREGISTRES)[0] + (await this.TotalGeneralFrancophoneSectionStatistics())
      .map(a=>a.TOTAL_EFFECTIFS_ENREGISTRES)[0]
      const TOTAL_MONTANT_ATTENDU = (await this.TotalGeneralAnglophoneSectionStatistics())
      .map(a=>a.TOTAL_MONTANT_ATTENDU)[0]+(await this.TotalGeneralFrancophoneSectionStatistics())
      .map(a=>a.TOTAL_MONTANT_ATTENDU)[0]
      const TOTAL_MONTANT_EN_CAISSE = (await this.TotalGeneralAnglophoneSectionStatistics())
      .map(a=>a.TOTAL_MONTANT_EN_CAISSE)[0]+(await this.TotalGeneralFrancophoneSectionStatistics())
      .map(a=>a.TOTAL_MONTANT_EN_CAISSE)[0]
      const TOTAL_TAUX_ENCAISSEMENT = (await this.TotalGeneralAnglophoneSectionStatistics())
      .map(a=>a.TOTAL_TAUX_ENCAISSEMENT)[0]+(await this.TotalGeneralFrancophoneSectionStatistics())
      .map(a=>a.TOTAL_TAUX_ENCAISSEMENT)[0]
      const TOTAL_RESTE_A_RECOUVRER=(await this.TotalGeneralAnglophoneSectionStatistics())
      .map(a=>a.TOTAL_RESTE_A_RECOUVRER)[0]+(await this.TotalGeneralFrancophoneSectionStatistics())
      .map(a=>a.TOTAL_RESTE_A_RECOUVRER)[0]
      const TAUX_RAR =(await this.TotalGeneralAnglophoneSectionStatistics())
      .map(a=>a.TAUX_RAR)[0]+(await this.TotalGeneralFrancophoneSectionStatistics())
      .map(a=>a.TAUX_RAR)[0]
    const T: TOTAL[] = [];
    T.push({
      TOTAL_EFFECTIFS_ENREGISTRES,
      TOTAL_MONTANT_ATTENDU,
      TOTAL_MONTANT_EN_CAISSE,
      TOTAL_TAUX_ENCAISSEMENT,
      TOTAL_RESTE_A_RECOUVRER,
      TAUX_RAR
    })
    return T
  }

////////////////////////////////////// extras /////////////////////////////////////////////////////////
  @Query(() => [SpecialStudentStatistics])
  getTrancheStatisticsForNormalStudents(): Promise<SpecialStudentStatistics[]> {
    return this.statisticsService.getTrancheStatisticsForNormalStudents();
  }

//   @Query(() => Number)
//   async getNumberOfStudentsStartedPayingAdmissionFeeSalle(@Args("sallename") sallename:string) {
//     return await this.statisticsService.numberOfStudentsStartedPayingAdmissionFeeSalle((sallename));
//   }

}
