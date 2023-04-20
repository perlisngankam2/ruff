/* eslint-disable prettier/prettier */
import { Args, Query, Resolver } from "@nestjs/graphql";
import { StatisticService } from "./statistics.service";
import { Student } from "src/entities/student.entity";


@Resolver()
export class StatisticResolver {
  constructor(private readonly statisticService: StatisticService) {}

   @Query(()=>Number)
   async totalNumberofStudentsinClass(@Args('id') id:string){
    return this.statisticService.totalNumberofStudentsinClass(id)
   }

   @Query(()=>[Student])
   async getallStudentswhoCompletedAdmissionfees(){
    return await this.statisticService.getallStudentswhoCompletedAdmissionfees()
   }

   @Query(()=>[Student])
   async getallStudentswhohaveCompletedTuitionfee(){
    return await this.statisticService.getallStudentswhohaveCompletedTuitionfee()
   }

   @Query(()=>[Student])
   async getallStudentswhohavenotCompletedAdmissionfee(){
    return await this.statisticService.getallStudentswhohavenotCompletedAdmissionfee()
   }

   @Query(()=>[Student])
   async numberStudentswhohavenotCompletedTuitionfee(){
    return await this.statisticService.numberStudentswhohavenotCompletedTuitionfee()
   }

   @Query(()=> Number)
   async totalAmountofEntries(){
    return await this.statisticService.totalAmountofEntries()
   }

   @Query(()=> Number)
   async balanceeExpected(@Args('salleid') salleid:string){
    return await this.statisticService.balanceeExpected(salleid)
   }

   @Query(()=> Number)
   async balanceInquierybyclass(@Args('salleid') salleid:string){
    return await this.statisticService.balanceInquierybyclass(salleid)
   }

   @Query(()=> Number)
   async totalAmountofExpenses(){
    return await this.statisticService.totalAmountofExpenses()
   }

   
   @Query(()=> Number)
   async AmountRemaining(@Args('salleid') salleid:string){
    return await this.statisticService.AmountRemaining(salleid)
   }

   @Query(()=> Number)
   async CollectionRate(@Args('salleid') salleid:string){
    return await this.statisticService.CollectionRate(salleid)
   }

   @Query(()=> Number)
   async RARrate(@Args('salleid') salleid:string){
    return await this.statisticService.RARrate(salleid)
   }


}
