/* eslint-disable prettier/prettier */
import { Args, Query, Resolver } from "@nestjs/graphql";
import { StatisticService } from "./statistics.service";


@Resolver()
export class StatisticResolver {
  constructor(private readonly statisticService: StatisticService) {}

   @Query(()=>Number)
   async totalNumberofStudentsinClass(@Args('id') id:string){
    return this.statisticService.totalNumberofStudentsinClass(id)
   }

   







}
