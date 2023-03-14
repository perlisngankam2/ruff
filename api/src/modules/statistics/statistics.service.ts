/* eslint-disable prettier/prettier */

import { EntityManager} from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { Student } from "src/entities/student.entity";
import { ExpenseService } from "../expenses/expense.service";
import { InscriptionService } from "../inscription/inscription.service";
import { SalleService } from "../salle/salle.service";
import { TrancheStudentService } from "../tranche-student/tranche-student.service";

@Injectable()
export class StatisticService {
  constructor(
    private readonly inscriptionservices: InscriptionService,
    private readonly tranchestudentservice: TrancheStudentService,
    private readonly salleservice: SalleService,
    private readonly expensesservice: ExpenseService,
    private readonly em: EntityManager,
  ) {}
  

  async getallStudentswhoCompletedAdmissionfees(){
    // const inscription = this.inscriptionservices.findByOne(inscription_id)
    // const b = Number((await (await inscription).fraisInscription.load()).montant)
    const a = (await this.inscriptionservices.getAll()).filter(async a=>a.montant===Number((await a.fraisInscription.load()).montant)).map(a=>a.student.load())
    return a
  }

  async getallStudentswhohaveCompletedTuitionfee(){
   const a = (await this.tranchestudentservice.getAll()).filter(async a=>a.montant===Number((await a.tranche.load()).montant)).map(a=>a.student.load())
   return a
  }

  async getallStudentswhohavenotCompletedAdmissionfee(){
    const a = (await this.inscriptionservices.getAll()).filter(async a=>a.montant<Number((await a.fraisInscription.load()).montant)).map(a=>a.student.load())
    return a
  }

  async getallStudentswhohavenotCompletedTuitionfee(){
    const a = (await this.tranchestudentservice.getAll()).filter(async a=>a.montant<Number((await a.tranche.load()).montant)).map(a=>a.student.load())
    return a
  }

  async numberStudentswhohavenotCompletedTuitionfee(){
    return Number((await this.tranchestudentservice.getAll()).filter(async a=>a.montant<Number((await a.tranche.load()).montant)).map(a=>a.student.load()).length)
  }

  async numberStudentswhohavenotCompletedAdmissionfee(){
  return Number((await this.inscriptionservices.getAll()).filter(async a=>a.montant<Number((await a.fraisInscription.load()).montant)).map(a=>a.student.load()).length)
  }

  async numberStudentswhohaveCompletedTuitionfee(){
    return Number((await this.tranchestudentservice.getAll()).filter(async a=>a.montant===Number((await a.tranche.load()).montant)).map(a=>a.student.load()).length)
  }

  async numberStudentswhohaveCompletedAdmissionfee(){
    return Number((await this.inscriptionservices.getAll()).filter(async a=>a.montant===Number((await a.fraisInscription.load()).montant)).map(a=>a.student.load()).length)
    }

  async totalAmountofEntries(){
   return Number((await this.tranchestudentservice.getAll()).filter(async a=>a.montant===Number((await a.tranche.load()).montant)).map(a=>a.student.load()).length + (await this.inscriptionservices.getAll()).filter(async a=>a.montant===Number((await a.fraisInscription.load()).montant)).map(a=>a.student.load()).length)
  }

  async totalAmountofExpenses(){
    return Number((await this.expensesservice.findall()).map(a=>a.amount).reduce(function(a,b){return a+b}))
  }

  async totalNumberofStudentsinClass(salle_id:string){
    return (await this.em.find(Student,{salle: salle_id})).map(a=>a).length
  }

  async balanceInquiery(salle_id:string){
    const a = Number((await this.tranchestudentservice.getAll()).filter(async a=>(await (await a.student.load()).salle.load()).id===salle_id).map(a=>a.montant).reduce(function(a,b){return a+b}))
    console.log(a)
    return a
  }

  async balanceeExpected(salle_id:string){
    const a = Number((await this.salleservice.getAll()).filter(a=>a.id===salle_id).map(a=>a.montantPensionSalle))
    return a
  }

  async CollectionRate(salle_id:string){
    const a = await this.balanceInquiery(salle_id) 
    const b = await this.balanceeExpected(salle_id)
    return Number((a/b)*100)
  }

  async AmountRemaining(salle_id:string){
    const a = await this.balanceInquiery(salle_id) 
    const b = await this.balanceeExpected(salle_id)
    return Number(b-a)
  }

  async RARrate(salle_id:string){
    const a = await this.AmountRemaining(salle_id)
    const b = await this.balanceeExpected(salle_id)
    return Number((a/b)*100)

  }

}