/* eslint-disable prettier/prettier */

import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { Regime, Student } from "src/entities/student.entity";
import { StudentService } from "../student/student.service";
import { SectionService } from "../section/section.service";
import { TrancheService } from "../tranche/tranche.service";
import { TrancheStudentService } from "../tranche-student/tranche-student.service";
import { SectionStatistics } from "./sectionstatistics";
import { ClassStatistics } from "./classStatistics";
import { SpecialStudentStatistics } from "./specialRegimeStudent";



@Injectable()
export class StatisticsService {
  constructor(
    private studentservice: StudentService,
    private sectionservice: SectionService,
    private trancheservice: TrancheService,
    private trancheStudentservice: TrancheStudentService,
  ) {}

  async getStudentStatistics(): Promise<
    {
      name: string;
      matricle: string;
      amountExpected: number;
      amountPaid: number;
      collectionRate: number;
      restToPay: number;
      rateArrears: number;
    }[]
  > {
    // const students = await this.studentRepository.find({
    //   relations: ['pensions', 'salle'],
    // });

    const students = await this.studentservice.getAll()



    return students.map(student => {
      const pensions = student.pension.toArray();
      const amountExpected =student.salle.getEntity().montantPensionSalle;
      console.log('=============>'+amountExpected)
      const amountPaid = pensions.reduce(
        (sum, pension) => sum + pension.montantPension,
        0,
      );
      const collectionRate = amountExpected === 0 ? 0 : (amountPaid / amountExpected) * 100;
      const restToPay = amountExpected - amountPaid;
      const rateArrears = amountExpected === 0 ? 0 : (restToPay / amountExpected) * 100;

      return {
        name: student.firstname,
        matricle: student.matricule || null,
        amountExpected,
        amountPaid,
        collectionRate,
        restToPay,
        rateArrears,
      };
    });
  }

  async getallStudentswhohaveCompletedFirstInstalment(){
  const tranche =  (await this.trancheservice.getAll()).filter(a=>a.priority==2)[0]
  const student = (await this.trancheStudentservice.getAll()).filter(async a=>(await a.tranche.load()).id==tranche.id).filter(a=>a.montant==tranche.montant).map(a=>a.student.load())
  return student
  }

  async getallStudentswhohaveCompletedAdmissionFee(){
    const tranche =  (await this.trancheservice.getAll()).filter(a=>a.priority==1)[0]
    const student = (await this.trancheStudentservice.getAll()).filter(async a=>(await a.tranche.load()).id==tranche.id).filter(a=>a.montant==tranche.montant).map(a=>a.student.load())
    return student
    }

async getSectionStatistics(): Promise<SectionStatistics[]> {
  const sections = await this.sectionservice.getAllForUse()

  const sectionStatistics: SectionStatistics[] = [];

  for (const section of sections) {
    for (const cycle of section.cycle.getItems()) {
      for (const cycleClass of cycle.salle.getItems()) {
        const numberOfStudents = cycleClass.student.count();
        const expectedAmount = cycleClass.montantPensionSalle * numberOfStudents;
        const numberOfStudentsCompletedFee = (await this.getallStudentswhohaveCompletedFirstInstalment()).length
        const rateR = numberOfStudentsCompletedFee / numberOfStudents * 100;
        const a = cycleClass.student.getItems()
        console.log('=============>'+a)
        const c = a.map(a=>a.pension)
        console.log("===========>"+c)
        // const b = a.map(a => a.pension.toArray().reduce(
        //   (sum, pension) => sum + pension.montantPension,
        //   0,
        // ));
        // console.log("==========>"+b)
        const b = a.map(a => {
          const pensions = a.pension.getItems();
          return pensions.reduce((sum, pension) => sum + pension.montantPension, 0);
        });
        console.log("===========>"+b)
        
        const sumAmountAlreadyPaid= b.reduce(
          (sum, pension) => sum + pension,
          0,
        );
        
        const rateT = sumAmountAlreadyPaid / expectedAmount * 100;
        const numberOfStudentsNotPaid = numberOfStudents - numberOfStudentsCompletedFee;
        const rateS = numberOfStudentsNotPaid / numberOfStudents * 100;
        const amountRest = expectedAmount - sumAmountAlreadyPaid;
        const rateZ = amountRest / expectedAmount * 100;

        sectionStatistics.push({
          sectionName: section.name,
          className: cycleClass.name,
          numberOfStudents,
          expectedAmount,
          numberOfStudentsCompletedFee,
          rateR,
          sumAmountAlreadyPaid,
          rateT,
          numberOfStudentsNotPaid,
          rateS,
          amountRest,
          rateZ,
        });
      }
    }
  }

  return sectionStatistics;
}


async getClassStatistics(): Promise<ClassStatistics[]>{

  const sections = await this.sectionservice.getAllForUse()

  const classStatistics: ClassStatistics[] = [];

  for (const section of sections) {
    for (const cycle of section.cycle.getItems()) {
      for (const cycleClass of cycle.salle.getItems()) {
        const numberOfStudents = cycleClass.student.count();
        const expectedAmount = cycleClass.montantPensionSalle * numberOfStudents;
        const numberOfStudentsCompletedFee = (this.getallStudentswhohaveCompletedAdmissionFee).length
        const rateR = numberOfStudentsCompletedFee / numberOfStudents * 100;
        const a = cycleClass.student.getItems()
        console.log('=============>'+a)
        const c = a.map(a=>a.pension)
        console.log("===========>"+c)
        // const b = a.map(a => a.pension.toArray().reduce(
        //   (sum, pension) => sum + pension.montantPension,
        //   0,
        // ));
        // console.log("==========>"+b)
        const b = a.map(a => {
          const pensions = a.pension.getItems();
          return pensions.reduce((sum, pension) => sum + pension.montantPension, 0);
        });
        console.log("===========>"+b)
        
        const sumAmountAlreadyPaid= b.reduce(
          (sum, pension) => sum + pension,
          0,
        );
        
        const rateT = sumAmountAlreadyPaid / expectedAmount * 100;
        const numberOfStudentsNotPaid = numberOfStudents - numberOfStudentsCompletedFee;
        const rateS = numberOfStudentsNotPaid / numberOfStudents * 100;
        const amountRest = expectedAmount - sumAmountAlreadyPaid;
        const rateZ = amountRest / expectedAmount * 100;

        classStatistics.push({
          className: cycleClass.name,
          numberOfStudents,
          expectedAmount,
          numberOfStudentsCompletedFee,
          rateR,
          sumAmountAlreadyPaid,
          rateT,
          numberOfStudentsNotPaid,
          rateS,
          amountRest,
          rateZ,
        });
      }
    }
  }

  return classStatistics;

}

// async getTrancheStatisticsForSpecialStudents(): Promise<SpecialStudentStatistics[]> {
//   const tranches = await this.trancheservice.getAllTranche()

//   return tranches
//     // .filter((tranche) => tranche.trancheStudent.toArray().every((ts) => ts.student.regime === Regime.SPECIAL))
//     .map((tranche) => {
//       const amountToPay = tranche.montant;
//       const dateLine = tranche.dateLine;
//       const paymentPriority = tranche.priority;

//        const studentData = tranche.trancheStudent.toArray().map( (ts) => {
//        const amountAlreadyPaid = ts.montant;
//         const paymentDate = ts.createdAt;
//         const studentid = ts.student;
//         const studentPhoneNumber = String(this.studentservice.findStudentTel(studentid))
//         const studentFirstName = String(this.studentservice.findStudentFirstNameById(studentid))
//         const studentLastName = String(this.studentservice.findStudentLastNameById(studentid))

//         const  restOfAmountToPay = amountToPay - amountAlreadyPaid;
//         return {
          // studentFirstName,
          // studentLastName,
          // studentPhoneNumber,
          // amountToPay,
          // restOfAmountToPay,
          // amountAlreadyPaid,
          // paymentDate,
          // paymentPriority,
          // dateLine,
//         };
//       });

//       return studentData;
//     })
//     .reduce((acc, cur) => [...acc, ...cur], []);
// }


async getTrancheStatisticsForSpecialStudents(): Promise<SpecialStudentStatistics[]> {
  const students = await this.studentservice.findAllStudentSpecialRegime();
  console.log('===============stud>'+students)

  const result: SpecialStudentStatistics[] = [];

  for (const student of students) {
    const tranches = await this.trancheStudentservice.findTrancheByStudent(student.id);
    console.log('=======================tranche>'+tranches)

    for (const tranche of tranches) {
      const amountToPay = (await tranche).montant;
      const dateLine = (await tranche).dateLine;
      const paymentPriority = (await tranche).priority;

      const trancheStudents = (await tranche).trancheStudent.toArray();
      const trancheStudent = trancheStudents.find((t) => t.student === student.id);
      console.log('tranchestudent=======>'+trancheStudent)
      if (!trancheStudent) break;

      const amountAlreadyPaid = trancheStudent.montant;
      const paymentDate = trancheStudent.createdAt;

      const studentFirstName = student.firstname;
      const studentLastName = student.lastname;
      const studentPhoneNumber = student.parentTel;

      const restOfAmountToPay = amountToPay - amountAlreadyPaid;
      console.log('=================>'+restOfAmountToPay)

      result.push({
        studentFirstName,
        studentLastName,
        studentPhoneNumber,
        amountToPay,
        restOfAmountToPay,
        amountAlreadyPaid,
        paymentDate,
        paymentPriority,
        dateLine,
      });
    }
  }

  console.log('====================>'+result)
  return result;
}

}










































































/* eslint-disable prettier/prettier */

// import { EntityManager} from "@mikro-orm/core";
// import { Injectable } from "@nestjs/common";
// import { Student } from "src/entities/student.entity";
// import { ExpenseService } from "../expenses/expense.service";
// import { InscriptionService } from "../inscription/inscription.service";
// import { SalleService } from "../salle/salle.service";
// import { TrancheStudentService } from "../tranche-student/tranche-student.service";
// import { PensionService } from "../pension/pension.service";
// import { TrancheService } from "../tranche/tranche.service";
// import { StudentService } from "../student/student.service";

// @Injectable()
// export class StatisticService {
//   constructor(
//     private readonly inscriptionservices: InscriptionService,
//     private readonly tranchestudentservice: TrancheStudentService,
//     private readonly salleservice: SalleService,
//     private readonly expensesservice: ExpenseService,
//     private readonly pensionservice:PensionService,
//     private readonly trancheservice:TrancheService,
//     private readonly studentservice: StudentService,
//     private readonly em: EntityManager,
//   ) {}
  

//   async getallStudentswhoCompletedAdmissionfees(){
//     const a= (await this.trancheservice.getAll()).map(a=>a.montant)
//     const min = Math.min(...a)
//     const tranche =  (await this.trancheservice.getAll()).filter(a=>a.montant==min)[0]
//     const student = (await this.tranchestudentservice.getAll()).filter(async a=>(await a.tranche.load()).id==tranche.id).filter(a=>a.montant==tranche.montant).map(a=>a.student.load())
//     return student

//   }

//   async getallStudentswhohaveCompletedTuitionfee(){
//     const a = (await this.pensionservice.getAll()).filter(a=>a.complete==true).map(a=>a.student.load())
//     return a
//   }

//   async getallStudentswhohavenotCompletedAdmissionfee(){
//   const a= (await this.trancheservice.getAll()).map(a=>a.montant)
//   const min = Math.min(...a)
//   const tranche =  (await this.trancheservice.getAll()).filter(a=>a.montant==min)[0]
//   const student = (await this.tranchestudentservice.getAll()).filter(async a=>(await a.tranche.load()).id==tranche.id).filter(a=>a.montant<tranche.montant).map(a=>a.student.load())
//   return student
//   }

//   async getallStudentswhohavenotCompletedTuitionfee(){
//     const a = (await this.pensionservice.getAll()).filter(a=>a.complete==false).map(a=>a.student.load())
//     return a
//   }

//   async numberStudentswhohavenotCompletedTuitionfee(){
//     return Number((await this.getallStudentswhohavenotCompletedTuitionfee()).length)
//   }

//   async numberStudentswhohavenotCompletedAdmissionfee(){
//   return Number((await this.getallStudentswhohavenotCompletedAdmissionfee()).length)
//   }

//   async numberStudentswhohaveCompletedTuitionfee(){
//     return Number((await this.getallStudentswhohaveCompletedTuitionfee()).length)
//   }

//   async numberStudentswhohaveCompletedAdmissionfee(){
//     return Number((await this.getallStudentswhoCompletedAdmissionfees()).length)
//     }

//   async totalAmountofEntries(){
//    return Number((await this.pensionservice.getAll()).map(a=>a.montantPension).reduce(function(a,b){return a+b}))
//   }

//   async totalAmountofExpenses(){
//     return Number((await this.expensesservice.findall()).map(a=>a.creditamount).reduce(function(a,b){return a+b}))
//   }

//   async totalNumberofStudentsinClass(salle_id:string){
//     return (await this.studentservice.getAll()).filter(async a=>(await a.salle.load()).id==salle_id).length
//   }

//   async balanceInquierybyclass(salle_id:string){
//     const b = (await this.pensionservice.getAll()).filter(async a=>(await ((await a.student.load()).salle.load())).id==salle_id).map(a=>a.montantPension).reduce(function(a,b){return a+b})
//     return b
    
//     // const joined = t.filter(async a=>{return b.some(async e=>(await e).id === a.id)})
//     }

//   async balanceeExpected(salle_id:string){
//     const a = Number((await this.salleservice.getAll()).filter(a=>a.id===salle_id).map(a=>a.montantPensionSalle))
//     return a
//   }

//   async CollectionRate(salle_id:string){
//     const a = await this.balanceInquierybyclass(salle_id) 
//     const b = await this.balanceeExpected(salle_id)
//     return Number((a/b)*100)
//   }

//   async AmountRemaining(salle_id:string){
//     const a = await this.balanceInquierybyclass(salle_id) 
//     const b = await this.balanceeExpected(salle_id)
//     return Number(b-a)
//   }

//   async RARrate(salle_id:string){
//     const a = await this.AmountRemaining(salle_id)
//     const b = await this.balanceeExpected(salle_id)
//     return Number((a/b)*100)

//   }

// }