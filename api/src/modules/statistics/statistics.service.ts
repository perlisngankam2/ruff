/* eslint-disable prettier/prettier */

import { EntityManager} from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { Student } from "src/entities/student.entity";
import { ExpenseService } from "../expenses/expense.service";
import { InscriptionService } from "../inscription/inscription.service";
import { SalleService } from "../salle/salle.service";
import { TrancheStudentService } from "../tranche-student/tranche-student.service";
import { PensionService } from "../pension/pension.service";
import { TrancheService } from "../tranche/tranche.service";
import { StudentService } from "../student/student.service";

@Injectable()
export class StatisticService {
  constructor(
    private readonly inscriptionservices: InscriptionService,
    private readonly tranchestudentservice: TrancheStudentService,
    private readonly salleservice: SalleService,
    private readonly expensesservice: ExpenseService,
    private readonly pensionservice:PensionService,
    private readonly trancheservice:TrancheService,
    private readonly studentservice: StudentService,
    private readonly em: EntityManager,
  ) {}
  

  async getallStudentswhoCompletedAdmissionfees(){
    const a= (await this.trancheservice.getAll()).map(a=>a.montant)
    const min = Math.min(...a)
    const tranche =  (await this.trancheservice.getAll()).filter(a=>a.montant==min)[0]
    const student = (await this.tranchestudentservice.getAll()).filter(async a=>(await a.tranche.load()).id==tranche.id).filter(a=>a.montant==tranche.montant).map(a=>a.student.load())
    return student

  }

  async getallStudentswhohaveCompletedTuitionfee(){
    const a = (await this.pensionservice.getAll()).filter(a=>a.complete==true).map(a=>a.student.load())
    return a
  }

  async getallStudentswhohavenotCompletedAdmissionfee(){
  const a= (await this.trancheservice.getAll()).map(a=>a.montant)
  const min = Math.min(...a)
  const tranche =  (await this.trancheservice.getAll()).filter(a=>a.montant==min)[0]
  const student = (await this.tranchestudentservice.getAll()).filter(async a=>(await a.tranche.load()).id==tranche.id).filter(a=>a.montant<tranche.montant).map(a=>a.student.load())
  return student
  }

  async getallStudentswhohavenotCompletedTuitionfee(){
    const a = (await this.pensionservice.getAll()).filter(a=>a.complete==false).map(a=>a.student.load())
    return a
  }

  async numberStudentswhohavenotCompletedTuitionfee(){
    return Number((await this.getallStudentswhohavenotCompletedTuitionfee()).length)
  }

  async numberStudentswhohavenotCompletedAdmissionfee(){
  return Number((await this.getallStudentswhohavenotCompletedAdmissionfee()).length)
  }

  async numberStudentswhohaveCompletedTuitionfee(){
    return Number((await this.getallStudentswhohaveCompletedTuitionfee()).length)
  }

  async numberStudentswhohaveCompletedAdmissionfee(){
    return Number((await this.getallStudentswhoCompletedAdmissionfees()).length)
    }

  async totalAmountofEntries(){
   return Number((await this.pensionservice.getAll()).map(a=>a.montantPension).reduce(function(a,b){return a+b}))
  }

  async totalAmountofExpenses(){
    return Number((await this.expensesservice.findall()).map(a=>a.amount).reduce(function(a,b){return a+b}))
  }

  async totalNumberofStudentsinClass(salle_id:string){
    return (await this.studentservice.getAll()).filter(async a=>(await a.salle.load()).id==salle_id).length
  }

  async balanceInquierybyclass(salle_id:string){
    const b = (await this.pensionservice.getAll()).filter(async a=>(await ((await a.student.load()).salle.load())).id==salle_id).map(a=>a.montantPension).reduce(function(a,b){return a+b})
    return b
    
    // const joined = t.filter(async a=>{return b.some(async e=>(await e).id === a.id)})
    }

  async balanceeExpected(salle_id:string){
    const a = Number((await this.salleservice.getAll()).filter(a=>a.id===salle_id).map(a=>a.montantPensionSalle))
    return a
  }

  async CollectionRate(salle_id:string){
    const a = await this.balanceInquierybyclass(salle_id) 
    const b = await this.balanceeExpected(salle_id)
    return Number((a/b)*100)
  }

  async AmountRemaining(salle_id:string){
    const a = await this.balanceInquierybyclass(salle_id) 
    const b = await this.balanceeExpected(salle_id)
    return Number(b-a)
  }

  async RARrate(salle_id:string){
    const a = await this.AmountRemaining(salle_id)
    const b = await this.balanceeExpected(salle_id)
    return Number((a/b)*100)

  }

}