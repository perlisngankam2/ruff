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
import { filter } from "rxjs";
import { AvanceTrancheService } from "../avance_tranche/avance-tranche.service";
import { Tranche } from "src/entities/tranche.entity";
import { PensionService } from "../pension/pension.service";



@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Tranche)
    private trancheRepository: EntityRepository<Tranche>,
    private studentservice: StudentService,
    private sectionservice: SectionService,
    private trancheservice: TrancheService,
    private trancheStudentservice: TrancheStudentService,
    private avancetrancheservice: AvanceTrancheService,
    private pensionservice: PensionService
  ) {}

  async getStudentStatisticsAnglophone(): Promise<
    {
      name: string;
      matricle: string;
      amountExpected: number;
      section:string;
      amountPaid: number;
      collectionRate: number;
      restToPay: number;
      rateArrears: number;
    }[]
  > {
    // const students = await this.studentRepository.find({
    //   relations: ['pensions', 'salle'],
    // });

    const students = await this.studentservice.getAllForUseAnglophone()



    return students.map(student => {
      const pensions = student.pension.toArray();
      const amountExpected =student.salle.getEntity().montantPensionSalle;
      const section = student.salle.getEntity().niveau.getEntity().cycle.getEntity().section.getEntity().name
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
        section,
        amountPaid,
        collectionRate,
        restToPay,
        rateArrears,
      };
    }).filter(a=>a.section==='Anglophone');
  }

  async getStudentStatisticsFrancophone(): Promise<
    {
      name: string;
      matricle: string;
      section:string;
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

    const students = await this.studentservice.getAllForUseFrancophone()


    return students.map(student => {
      const pensions = student.pension.toArray();
      const amountExpected =student.salle.getEntity().montantPensionSalle;
      console.log('=============>'+amountExpected)
      const section = student.salle.getEntity().niveau.getEntity().cycle.getEntity().section.getEntity().name
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
        section,
        amountPaid,
        collectionRate,
        restToPay,
        rateArrears,
      };
    }).filter(a=>a.section==='Francophone');
  }


  async getallStudentswhohaveCompletedFirstInstalment(){
  const tranche =  (await this.trancheservice.getAll())
  const student = (await this.trancheStudentservice.getAll())
  .filter(a=>tranche.find(async b=>(await a.tranche.load()).id===b.id))
  .filter(a=>tranche.find(async b=>(await a.tranche.load()).year===b.year))
  .filter(a=>tranche.find(async b=>(await a.tranche.load()).montant===b.montant))
  .filter(async a=>(await a.tranche.load()).name==='tranche 1')
  .map(a=>a.student.load())
  return student
  }

  async getallStudentswhohaveCompletedFee(){
    const montant  = (await this.trancheservice.getAll()).map(a=>a.montant).reduce(function(a,b){return a+b})
   return (await this.pensionservice.getAll()).filter(a=>a.montantPension==montant).map(a=>a.student.load())
    }

  async getallStudentswhohaveCompletedAdmissionFee(){
    const tranche =  (await this.trancheservice.getAll())
    const student = (await this.trancheStudentservice.getAll())
    .filter(a=>tranche.find(async b=>(await a.tranche.load()).id===b.id))
    .filter(a=>tranche.find(async b=>(await a.tranche.load()).year===b.year))
    .filter(a=>tranche.find(async b=>(await a.tranche.load()).montant===b.montant))
    .filter(async a=>(await a.tranche.load()).name==='inscription')
    .map(a=>a.student.load())
    return student
    }

    async getallStudentswhohaveCompletedSecondInstalment(){
      const tranche =  (await this.trancheservice.getAll())
      const student = (await this.trancheStudentservice.getAll())
      .filter(a=>tranche.find(async b=>(await a.tranche.load()).id===b.id))
      .filter(a=>tranche.find(async b=>(await a.tranche.load()).year===b.year))
      .filter(a=>tranche.find(async b=>(await a.tranche.load()).montant===b.montant))
      .filter(async a=>(await a.tranche.load()).name==='tranche 2')
      .map(a=>a.student.load())
      return student
      }

  async numberOfStudentsStartedPayingPension(){
    const students = await this.studentservice.getAll()
    const studentavancetranche = (await this.avancetrancheservice.getAllavancetranche()).map(async a=>(await a.student.load()))
    .filter(a=>students.find(async b => (await a).id==b.id))
    return Number(studentavancetranche.length)
  }

  async numberOfStudentsStartedPayingAdmissionFee(){
    const tranche = (await this.trancheservice.getAll()).filter(a=>a.name=='inscription').map(a=>a.id)[0]
    console.log('=====>trancheid'+tranche)
    const studentTrancheStudent = (await this.trancheStudentservice.getAll()).filter( a=>a.tranche.id===tranche)
    console.log('does for admission'+studentTrancheStudent)
    return Number(studentTrancheStudent.length)
  }

  async numberOfStudentsStartedPayingFirstInstalment(){
    const tranche = (await this.trancheservice.getAll()).filter(a=>a.name=='tranche 1').map(a=>a.id)[0]
    const studentTrancheStudent = (await this.trancheStudentservice.getAll()).filter(a=>a.tranche.id==tranche)
    console.log('does for firstinstalment'+studentTrancheStudent)
    return Number(studentTrancheStudent.length)
  }

  async numberOfStudentsStartedPayingSecondInstalment(){
    const tranche = (await this.trancheservice.getAll()).filter(a=>a.name=='tranche 2').map(a=>a.id)[0]
    const studentTrancheStudent = (await this.trancheStudentservice.getAll()).filter(a=>a.tranche.id==tranche)
    console.log('does for firstinstalment'+studentTrancheStudent)
    return Number(studentTrancheStudent.length)
  }

  async TotalAmountFirstInstalment(){
    return (await this.trancheservice.getAll()).filter(a=>a.name=='tranche 1').map(a=>a.montant)[0]
    // const studentTrancheStudent = (await this.trancheStudentservice.getAll()).filter(a=>a.tranche.id==tranche)
    // .map(a=>a.montant).reduce(function(a,b){return a+b})
    // return Number(studentTrancheStudent)
  }

  async TotalAmountSecondInstalment(){
    return (await this.trancheservice.getAll()).filter(a=>a.name=='tranche 2').map(a=>a.montant)[0]
    // const studentTrancheStudent = (await this.trancheStudentservice.getAll()).filter(a=>a.tranche.id==tranche)
    // .map(a=>a.montant).reduce(function(a,b){return a+b})
    // return Number(studentTrancheStudent)
  }

  async TotalAmountAdmissionFee(){
    return  (await this.trancheservice.getAll()).filter(a=>a.name=='inscription').map(a=>a.montant)[0]
    // const studentTrancheStudent = (await this.trancheStudentservice.getAll()).filter(a=>a.tranche.id==tranche)
    // .map(a=>a.montant).reduce(function(a,b){return a+b})
    // return Number(studentTrancheStudent)
  }

  async getSectionStatisticsAnglophoneAdmissionFee(): Promise<SectionStatistics[]> {
    const sections = await this.sectionservice.getAllForUseAnglophone()
  
    const sectionStatistics: SectionStatistics[] = [];
  
    for (const section of sections) {
      for (const cycle of section.cycle.getItems()) {
        for (const niveauclass of cycle.niveauEtude.getItems()){
          for (const cycleClass of niveauclass.salle.getItems()) {
            console.log("cycleClass", cycleClass);
          const numberOfStudents = Number(await this.numberOfStudentsStartedPayingAdmissionFee())
          const expectedAmount = Number(await this.TotalAmountAdmissionFee()) * numberOfStudents;
          console.log("expectedAmount", expectedAmount);
  
          const numberOfStudentsCompletedFee = (this.getallStudentswhohaveCompletedAdmissionFee).length
          const  TAUXA= numberOfStudentsCompletedFee >0? numberOfStudentsCompletedFee / numberOfStudents * 100 : 0
          console.log("TAUXA", TAUXA);
          
          const a = cycleClass.student.getItems()
          console.log('aaaaa'+a)
          const c = a.map(a=>a.pension)
          console.log("ccccc"+c)
          // const b = a.map(a => a.pension.toArray().reduce(
          //   (sum, pension) => sum + pension.montantPension,
          //   0,
          // ));
          // console.log("==========>"+b)
          const b = a.map(a => {
            const pensions = a.pension.getItems();
            return pensions.reduce((sum, pension) => sum + pension.montantPension, 0);
          });
          console.log("bbbb"+b)
          
          const sumAmountAlreadyPaid= b.reduce(
            (sum, pension) => sum + pension,
            0,
          );
          
          const TAUXB = sumAmountAlreadyPaid>0? sumAmountAlreadyPaid / expectedAmount * 100:0;
          const numberOfStudentsNotPaid = numberOfStudents - numberOfStudentsCompletedFee;
          const TAUXC =  numberOfStudentsNotPaid>0? numberOfStudentsNotPaid / numberOfStudents * 100:0;
          const amountRest = expectedAmount - sumAmountAlreadyPaid;
          const TAUXD = amountRest>0? amountRest / expectedAmount * 100:0;
  
          sectionStatistics.push({
            sectionName: section.name,
            className: cycleClass.name,
            numberOfStudents,
            expectedAmount,
            numberOfStudentsCompletedFee,
            TAUXA,
            sumAmountAlreadyPaid,
            TAUXB,
            numberOfStudentsNotPaid,
            TAUXC,
            amountRest,
            TAUXD,
          });
        }
      }
      }
    }
  
    return sectionStatistics;
  }

  async getSectionStatisticsAnglophoneFirstInstalment(): Promise<SectionStatistics[]> {
    const sections = await this.sectionservice.getAllForUseAnglophone()
  
    const sectionStatistics: SectionStatistics[] = [];
  
    for (const section of sections) {
      for (const cycle of section.cycle.getItems()) {
        for (const niveauclass of cycle.niveauEtude.getItems()){
          for (const cycleClass of niveauclass.salle.getItems()) {
            console.log("cycleClass", cycleClass);
          const numberOfStudents = Number(await this.numberOfStudentsStartedPayingFirstInstalment())
          const expectedAmount = Number(await this.TotalAmountFirstInstalment()) * numberOfStudents;
          console.log("expectedAmount", expectedAmount);
  
          const numberOfStudentsCompletedFee = (this.getallStudentswhohaveCompletedFirstInstalment).length
          const  TAUXA= numberOfStudentsCompletedFee >0? numberOfStudentsCompletedFee / numberOfStudents * 100 : 0
          console.log("TAUXA", TAUXA);
          
          const a = cycleClass.student.getItems()
          console.log('aaaaa'+a)
          const c = a.map(a=>a.pension)
          console.log("ccccc"+c)
          // const b = a.map(a => a.pension.toArray().reduce(
          //   (sum, pension) => sum + pension.montantPension,
          //   0,
          // ));
          // console.log("==========>"+b)
          const b = a.map(a => {
            const pensions = a.pension.getItems();
            return pensions.reduce((sum, pension) => sum + pension.montantPension, 0);
          });
          console.log("bbbb"+b)
          
          const sumAmountAlreadyPaid= b.reduce(
            (sum, pension) => sum + pension,
            0,
          );
          
          const TAUXB = sumAmountAlreadyPaid>0? sumAmountAlreadyPaid / expectedAmount * 100:0;
          const numberOfStudentsNotPaid = numberOfStudents - numberOfStudentsCompletedFee;
          const TAUXC =  numberOfStudentsNotPaid>0? numberOfStudentsNotPaid / numberOfStudents * 100:0;
          const amountRest = expectedAmount - sumAmountAlreadyPaid;
          const TAUXD = amountRest>0? amountRest / expectedAmount * 100:0;
  
          sectionStatistics.push({
            sectionName: section.name,
            className: cycleClass.name,
            numberOfStudents,
            expectedAmount,
            numberOfStudentsCompletedFee,
            TAUXA,
            sumAmountAlreadyPaid,
            TAUXB,
            numberOfStudentsNotPaid,
            TAUXC,
            amountRest,
            TAUXD,
          });
        }
      }
      }
    }
  
    return sectionStatistics;
  }

  async getSectionStatisticsAnglophoneSecondInstalment(): Promise<SectionStatistics[]> {
    const sections = await this.sectionservice.getAllForUseAnglophone()
  
    const sectionStatistics: SectionStatistics[] = [];
  
    for (const section of sections) {
      for (const cycle of section.cycle.getItems()) {
        for (const niveauclass of cycle.niveauEtude.getItems()){
          for (const cycleClass of niveauclass.salle.getItems()) {
            console.log("cycleClass", cycleClass);
          const numberOfStudents = Number(await this.numberOfStudentsStartedPayingSecondInstalment())
          const expectedAmount = Number(await this.TotalAmountSecondInstalment()) * numberOfStudents;
          console.log("expectedAmount", expectedAmount);
  
          const numberOfStudentsCompletedFee = (this.getallStudentswhohaveCompletedSecondInstalment).length
          const  TAUXA= numberOfStudentsCompletedFee >0? numberOfStudentsCompletedFee / numberOfStudents * 100 : 0
          console.log("TAUXA", TAUXA);
          
          const a = cycleClass.student.getItems()
          console.log('aaaaa'+a)
          const c = a.map(a=>a.pension)
          console.log("ccccc"+c)
          // const b = a.map(a => a.pension.toArray().reduce(
          //   (sum, pension) => sum + pension.montantPension,
          //   0,
          // ));
          // console.log("==========>"+b)
          const b = a.map(a => {
            const pensions = a.pension.getItems();
            return pensions.reduce((sum, pension) => sum + pension.montantPension, 0);
          });
          console.log("bbbb"+b)
          
          const sumAmountAlreadyPaid= b.reduce(
            (sum, pension) => sum + pension,
            0,
          );
          
          const TAUXB = sumAmountAlreadyPaid>0? sumAmountAlreadyPaid / expectedAmount * 100:0;
          const numberOfStudentsNotPaid = numberOfStudents - numberOfStudentsCompletedFee;
          const TAUXC =  numberOfStudentsNotPaid>0? numberOfStudentsNotPaid / numberOfStudents * 100:0;
          const amountRest = expectedAmount - sumAmountAlreadyPaid;
          const TAUXD = amountRest>0? amountRest / expectedAmount * 100:0;
  
          sectionStatistics.push({
            sectionName: section.name,
            className: cycleClass.name,
            numberOfStudents,
            expectedAmount,
            numberOfStudentsCompletedFee,
            TAUXA,
            sumAmountAlreadyPaid,
            TAUXB,
            numberOfStudentsNotPaid,
            TAUXC,
            amountRest,
            TAUXD,
          });
        }
      }
      }
    }
  
    return sectionStatistics;
  }

  async getSectionStatisticsFrancophoneAdmissionFee(): Promise<SectionStatistics[]> {
    const sections = await this.sectionservice.getAllForUseFrancophone()
  
    const sectionStatistics: SectionStatistics[] = [];
  
    for (const section of sections) {
      for (const cycle of section.cycle.getItems()) {
        for (const niveauclass of cycle.niveauEtude.getItems()){
          for (const cycleClass of niveauclass.salle.getItems()) {
            console.log("cycleClass", cycleClass);
          const numberOfStudents = Number(await this.numberOfStudentsStartedPayingAdmissionFee())
          const expectedAmount = Number(await this.TotalAmountAdmissionFee()) * numberOfStudents;
          console.log("expectedAmount", expectedAmount);
  
          const numberOfStudentsCompletedFee = (this.getallStudentswhohaveCompletedAdmissionFee).length
          const  TAUXA= numberOfStudentsCompletedFee >0? numberOfStudentsCompletedFee / numberOfStudents * 100 : 0
          console.log("TAUXA", TAUXA);
          
          const a = cycleClass.student.getItems()
          console.log('aaaaa'+a)
          const c = a.map(a=>a.pension)
          console.log("ccccc"+c)
          // const b = a.map(a => a.pension.toArray().reduce(
          //   (sum, pension) => sum + pension.montantPension,
          //   0,
          // ));
          // console.log("==========>"+b)
          const b = a.map(a => {
            const pensions = a.pension.getItems();
            return pensions.reduce((sum, pension) => sum + pension.montantPension, 0);
          });
          console.log("bbbb"+b)
          
          const sumAmountAlreadyPaid= b.reduce(
            (sum, pension) => sum + pension,
            0,
          );
          
          const TAUXB = sumAmountAlreadyPaid>0? sumAmountAlreadyPaid / expectedAmount * 100:0;
          const numberOfStudentsNotPaid = numberOfStudents - numberOfStudentsCompletedFee;
          const TAUXC =  numberOfStudentsNotPaid>0? numberOfStudentsNotPaid / numberOfStudents * 100:0;
          const amountRest = expectedAmount - sumAmountAlreadyPaid;
          const TAUXD = amountRest>0? amountRest / expectedAmount * 100:0;
  
          sectionStatistics.push({
            sectionName: section.name,
            className: cycleClass.name,
            numberOfStudents,
            expectedAmount,
            numberOfStudentsCompletedFee,
            TAUXA,
            sumAmountAlreadyPaid,
            TAUXB,
            numberOfStudentsNotPaid,
            TAUXC,
            amountRest,
            TAUXD,
          });
        }
      }
      }
    }
  
    return sectionStatistics;
  }

  async getSectionStatisticsFrancophomeFirstInstalment(): Promise<SectionStatistics[]> {
    const sections = await this.sectionservice.getAllForUseFrancophone()
  
    const sectionStatistics: SectionStatistics[] = [];
  
    for (const section of sections) {
      for (const cycle of section.cycle.getItems()) {
        for (const niveauclass of cycle.niveauEtude.getItems()){
          for (const cycleClass of niveauclass.salle.getItems()) {
            console.log("cycleClass", cycleClass);
          const numberOfStudents = Number(await this.numberOfStudentsStartedPayingFirstInstalment())
          const expectedAmount = Number(await this.TotalAmountFirstInstalment()) * numberOfStudents;
          console.log("expectedAmount", expectedAmount);
  
          const numberOfStudentsCompletedFee = (this.getallStudentswhohaveCompletedFirstInstalment).length
          const  TAUXA= numberOfStudentsCompletedFee >0? numberOfStudentsCompletedFee / numberOfStudents * 100 : 0
          console.log("TAUXA", TAUXA);
          
          const a = cycleClass.student.getItems()
          console.log('aaaaa'+a)
          const c = a.map(a=>a.pension)
          console.log("ccccc"+c)
          // const b = a.map(a => a.pension.toArray().reduce(
          //   (sum, pension) => sum + pension.montantPension,
          //   0,
          // ));
          // console.log("==========>"+b)
          const b = a.map(a => {
            const pensions = a.pension.getItems();
            return pensions.reduce((sum, pension) => sum + pension.montantPension, 0);
          });
          console.log("bbbb"+b)
          
          const sumAmountAlreadyPaid= b.reduce(
            (sum, pension) => sum + pension,
            0,
          );
          
          const TAUXB = sumAmountAlreadyPaid>0? sumAmountAlreadyPaid / expectedAmount * 100:0;
          const numberOfStudentsNotPaid = numberOfStudents - numberOfStudentsCompletedFee;
          const TAUXC =  numberOfStudentsNotPaid>0? numberOfStudentsNotPaid / numberOfStudents * 100:0;
          const amountRest = expectedAmount - sumAmountAlreadyPaid;
          const TAUXD = amountRest>0? amountRest / expectedAmount * 100:0;
  
          sectionStatistics.push({
            sectionName: section.name,
            className: cycleClass.name,
            numberOfStudents,
            expectedAmount,
            numberOfStudentsCompletedFee,
            TAUXA,
            sumAmountAlreadyPaid,
            TAUXB,
            numberOfStudentsNotPaid,
            TAUXC,
            amountRest,
            TAUXD,
          });
        }
      }
      }
    }
  
    return sectionStatistics;
  }


  async getSectionStatisticsFrancophoneSecondInstalment(): Promise<SectionStatistics[]> {
    const sections = await this.sectionservice.getAllForUseFrancophone()
  
    const sectionStatistics: SectionStatistics[] = [];
  
    for (const section of sections) {
      for (const cycle of section.cycle.getItems()) {
        for (const niveauclass of cycle.niveauEtude.getItems()){
          for (const cycleClass of niveauclass.salle.getItems()) {
            console.log("cycleClass", cycleClass);
          const numberOfStudents = Number(await this.numberOfStudentsStartedPayingSecondInstalment())
          const expectedAmount = Number(await this.TotalAmountSecondInstalment()) * numberOfStudents;
          console.log("expectedAmount", expectedAmount);
  
          const numberOfStudentsCompletedFee = (this.getallStudentswhohaveCompletedSecondInstalment).length
          const  TAUXA= numberOfStudentsCompletedFee >0? numberOfStudentsCompletedFee / numberOfStudents * 100 : 0
          console.log("TAUXA", TAUXA);
          
          const a = cycleClass.student.getItems()
          console.log('aaaaa'+a)
          const c = a.map(a=>a.pension)
          console.log("ccccc"+c)
          // const b = a.map(a => a.pension.toArray().reduce(
          //   (sum, pension) => sum + pension.montantPension,
          //   0,
          // ));
          // console.log("==========>"+b)
          const b = a.map(a => {
            const pensions = a.pension.getItems();
            return pensions.reduce((sum, pension) => sum + pension.montantPension, 0);
          });
          console.log("bbbb"+b)
          
          const sumAmountAlreadyPaid= b.reduce(
            (sum, pension) => sum + pension,
            0,
          );
          
          const TAUXB = sumAmountAlreadyPaid>0? sumAmountAlreadyPaid / expectedAmount * 100:0;
          const numberOfStudentsNotPaid = numberOfStudents - numberOfStudentsCompletedFee;
          const TAUXC =  numberOfStudentsNotPaid>0? numberOfStudentsNotPaid / numberOfStudents * 100:0;
          const amountRest = expectedAmount - sumAmountAlreadyPaid;
          const TAUXD = amountRest>0? amountRest / expectedAmount * 100:0;
  
          sectionStatistics.push({
            sectionName: section.name,
            className: cycleClass.name,
            numberOfStudents,
            expectedAmount,
            numberOfStudentsCompletedFee,
            TAUXA,
            sumAmountAlreadyPaid,
            TAUXB,
            numberOfStudentsNotPaid,
            TAUXC,
            amountRest,
            TAUXD,
          });
        }
      }
      }
    }
  
    return sectionStatistics;
  }

async getClassStatistics(): Promise<ClassStatistics[]>{

  const sections = await this.sectionservice.getAllForUseAnglophone()

  const classStatistics: ClassStatistics[] = [];

  for (const section of sections) {
    for (const cycle of section.cycle.getItems()) {
      for (const niveauclass of cycle.niveauEtude.getItems()){
        for (const cycleClass of niveauclass.salle.getItems()) {
        const numberOfStudents = cycleClass.student.count()>0? cycleClass.student.count():0;
        const expectedAmount = cycleClass.montantPensionSalle * numberOfStudents;
        const numberOfStudentsCompletedFee = (this.getallStudentswhohaveCompletedAdmissionFee).length
        const rateR = numberOfStudentsCompletedFee > 0 ? numberOfStudentsCompletedFee / numberOfStudents * 100 : 0;
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
        
        const rateT =sumAmountAlreadyPaid>0? sumAmountAlreadyPaid / expectedAmount * 100:0;
        const numberOfStudentsNotPaid = numberOfStudents - numberOfStudentsCompletedFee;
        const rateS = numberOfStudentsNotPaid>0?numberOfStudentsNotPaid / numberOfStudents * 100:0;
        const amountRest = expectedAmount - sumAmountAlreadyPaid;
        const rateZ = amountRest>0? amountRest / expectedAmount * 100:0;

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
  }

  return classStatistics;

}

async getGeneralSectionStatistics(): Promise<SectionStatistics[]>{

  const sections = await this.sectionservice.getAllForUse()

  const sectionStatistics: SectionStatistics[] = [];

  for (const section of sections) {
    for (const cycle of section.cycle.getItems()) {
      for (const niveauclass of cycle.niveauEtude.getItems()){
        for (const cycleClass of niveauclass.salle.getItems()) {
        const numberOfStudents = Number(await this.numberOfStudentsStartedPayingPension())
        const expectedAmount = cycleClass.montantPensionSalle * numberOfStudents;
        const numberOfStudentsCompletedFee = (this.getallStudentswhohaveCompletedFee).length
        const  TAUXA= numberOfStudentsCompletedFee >0? numberOfStudentsCompletedFee / numberOfStudents * 100 : 0
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
        
        const TAUXB = sumAmountAlreadyPaid>0? sumAmountAlreadyPaid / expectedAmount * 100:0;
          const numberOfStudentsNotPaid = numberOfStudents - numberOfStudentsCompletedFee;
          const TAUXC =  numberOfStudentsNotPaid>0? numberOfStudentsNotPaid / numberOfStudents * 100:0;
          const amountRest = expectedAmount - sumAmountAlreadyPaid;
          const TAUXD = amountRest>0? amountRest / expectedAmount * 100:0;
  
          sectionStatistics.push({
            sectionName: section.name,
            className: cycleClass.name,
            numberOfStudents,
            expectedAmount,
            numberOfStudentsCompletedFee,
            TAUXA,
            sumAmountAlreadyPaid,
            TAUXB,
            numberOfStudentsNotPaid,
            TAUXC,
            amountRest,
            TAUXD,
        });
      }
    }
    }
  }

  return sectionStatistics;

}

async getGeneralAnglophoneSectionStatistics(): Promise<SectionStatistics[]>{

  const sections = await this.sectionservice.getAllForUseAnglophone()

  const sectionStatistics: SectionStatistics[] = [];

  for (const section of sections) {
    for (const cycle of section.cycle.getItems()) {
      for (const niveauclass of cycle.niveauEtude.getItems()){
        for (const cycleClass of niveauclass.salle.getItems()) {
        const numberOfStudents = Number(await this.numberOfStudentsStartedPayingPension())
        const expectedAmount = cycleClass.montantPensionSalle * numberOfStudents;
        const numberOfStudentsCompletedFee = (this.getallStudentswhohaveCompletedFee).length
        const  TAUXA= numberOfStudentsCompletedFee >0? numberOfStudentsCompletedFee / numberOfStudents * 100 : 0
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
        
        const TAUXB = sumAmountAlreadyPaid>0? sumAmountAlreadyPaid / expectedAmount * 100:0;
          const numberOfStudentsNotPaid = numberOfStudents - numberOfStudentsCompletedFee;
          const TAUXC =  numberOfStudentsNotPaid>0? numberOfStudentsNotPaid / numberOfStudents * 100:0;
          const amountRest = expectedAmount - sumAmountAlreadyPaid;
          const TAUXD = amountRest>0? amountRest / expectedAmount * 100:0;
  
          sectionStatistics.push({
            sectionName: section.name,
            className: cycleClass.name,
            numberOfStudents,
            expectedAmount,
            numberOfStudentsCompletedFee,
            TAUXA,
            sumAmountAlreadyPaid,
            TAUXB,
            numberOfStudentsNotPaid,
            TAUXC,
            amountRest,
            TAUXD,
        });
      }
    }
    }
  }

  return sectionStatistics;

}

async getGeneralFrancophoneSectionStatistics(): Promise<SectionStatistics[]>{

  const sections = await this.sectionservice.getAllForUseFrancophone()

  const sectionStatistics: SectionStatistics[] = [];

  for (const section of sections) {
    for (const cycle of section.cycle.getItems()) {
      for (const niveauclass of cycle.niveauEtude.getItems()){
        for (const cycleClass of niveauclass.salle.getItems()) {
        const numberOfStudents = Number(await this.numberOfStudentsStartedPayingPension())
        const expectedAmount = cycleClass.montantPensionSalle * numberOfStudents;
        const numberOfStudentsCompletedFee = (this.getallStudentswhohaveCompletedFee).length
        const  TAUXA= numberOfStudentsCompletedFee >0? numberOfStudentsCompletedFee / numberOfStudents * 100 : 0
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
        
        const TAUXB = sumAmountAlreadyPaid>0? sumAmountAlreadyPaid / expectedAmount * 100:0;
          const numberOfStudentsNotPaid = numberOfStudents - numberOfStudentsCompletedFee;
          const TAUXC =  numberOfStudentsNotPaid>0? numberOfStudentsNotPaid / numberOfStudents * 100:0;
          const amountRest = expectedAmount - sumAmountAlreadyPaid;
          const TAUXD = amountRest>0? amountRest / expectedAmount * 100:0;
  
          sectionStatistics.push({
            sectionName: section.name,
            className: cycleClass.name,
            numberOfStudents,
            expectedAmount,
            numberOfStudentsCompletedFee,
            TAUXA,
            sumAmountAlreadyPaid,
            TAUXB,
            numberOfStudentsNotPaid,
            TAUXC,
            amountRest,
            TAUXD,
        });
      }
    }
    }
  }

  return sectionStatistics;

}






async getTrancheStatisticsForSpecialStudents(): Promise<SpecialStudentStatistics[]> {
  const students = await this.studentservice.findAllStudentSpecialRegime();
  console.log('===============stud>'+students)

  const Tranches = students.map((student) => student.trancheStudent.getItems().map((trancheStudent) => trancheStudent.tranche));

  const tranches = await Promise.all(Tranches.flat().map((tranche) => this.trancheRepository.findOne(tranche.id, { populate: ['trancheStudent'] })));

  console.log("==============>"+tranches)
  
  const result: SpecialStudentStatistics[] = [];

  for (const student of students) {
    for (const tranche of tranches) {
      const amountToPay = (await tranche).montant;
      const dateLine = (await tranche).dateLine;
      const paymentPriority = (await tranche).priority;
      const nameTranche = tranche.name
      

      const trancheStudent = tranche.trancheStudent.getItems()
      .filter(async a=>(await a.tranche.load()).id===tranche.id);
      console.log('tranchestudent=======>'+trancheStudent)
      if (trancheStudent.length==0) break;

      for(const trancheStd of trancheStudent){
      const amountAlreadyPaid = trancheStd.montant;
      const paymentDate = trancheStd.createdAt;

      const studentFirstName = student.firstname;
      const studentLastName = student.lastname;
      const studentPhoneNumber = student.fatherPhoneNumber || student.motherPhoneNumber || student.tutorPhoneNumber;

      const restOfAmountToPay = amountToPay - amountAlreadyPaid;
      console.log('=================>'+restOfAmountToPay)
      const categorie=((await student.categorie.load()).description)

      result.push({
        studentFirstName,
        studentLastName,
        categorie,
        nameTranche,
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
  }

  console.log('====================>'+result.filter(a=>a.categorie==='Candidat special'))
  return result.filter(a=>a.categorie==='Candidat special');
}

async getTrancheStatisticsForNormalStudents(): Promise<SpecialStudentStatistics[]> {
  const students = await this.studentservice.findAllStudentNormalRegime();
  console.log('===============stud>'+students)

  const Tranches = students.map((student) => student.trancheStudent.getItems().map((trancheStudent) => trancheStudent.tranche));

  const tranches = await Promise.all(Tranches.flat().map((tranche) => this.trancheRepository.findOne(tranche.id, { populate: ['trancheStudent'] })));

  console.log("==============>"+tranches)
  
  const result: SpecialStudentStatistics[] = [];

  for (const student of students) {
    for (const tranche of tranches) {
      const amountToPay = (await tranche).montant;
      const dateLine = (await tranche).dateLine;
      const paymentPriority = (await tranche).priority;
      const nameTranche = tranche.name
      

      const trancheStudent = tranche.trancheStudent.getItems()
      .filter(async a=>(await a.tranche.load()).id===tranche.id);
      console.log('tranchestudent=======>'+trancheStudent)
      if (trancheStudent.length==0) break;

      for(const trancheStd of trancheStudent){
      const amountAlreadyPaid = trancheStd.montant;
      const paymentDate = trancheStd.createdAt;

      const studentFirstName = student.firstname;
      const studentLastName = student.lastname;
      const studentPhoneNumber = student.fatherPhoneNumber || student.motherPhoneNumber || student.tutorPhoneNumber;

      const restOfAmountToPay = amountToPay - amountAlreadyPaid;
      console.log('=================>'+restOfAmountToPay)
      const categorie=((await student.categorie.load()).description)

      result.push({
        studentFirstName,
        studentLastName,
        categorie,
        nameTranche,
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
  }

  console.log('====================>'+result.filter(a=>a.categorie==='Candidat libre'))
  return result.filter(a=>a.categorie==='Candidat libre');
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
// async getGeneralAnglophoneFirstInstalmentSectionStatistics(): Promise<SectionStatistics[]>{

//   const sections = await this.sectionservice.getAllForUseAnglophone()

//   const sectionStatistics: SectionStatistics[] = [];

//   for (const section of sections) {
//     for (const cycle of section.cycle.getItems()) {
//       for (const niveauclass of cycle.niveauEtude.getItems()){
//         for (const cycleClass of niveauclass.salle.getItems()) {
//         const numberOfStudents = Number(await this.numberOfStudentsStartedPayingFirstInstalment())
//         const expectedAmount = cycleClass.montantPensionSalle * numberOfStudents;
//         const numberOfStudentsCompletedFee = (this.getallStudentswhohaveCompletedAdmissionFee).length
//         const  TAUXA= numberOfStudentsCompletedFee >0? numberOfStudentsCompletedFee / numberOfStudents * 100 : 0
//         const a = cycleClass.student.getItems()
//         console.log('=============>'+a)
//         const c = a.map(a=>a.pension)
//         console.log("===========>"+c)
//         // const b = a.map(a => a.pension.toArray().reduce(
//         //   (sum, pension) => sum + pension.montantPension,
//         //   0,
//         // ));
//         // console.log("==========>"+b)
//         const b = a.map(a => {
//           const pensions = a.pension.getItems();
//           return pensions.reduce((sum, pension) => sum + pension.montantPension, 0);
//         });
//         console.log("===========>"+b)
        
//         const sumAmountAlreadyPaid= b.reduce(
//           (sum, pension) => sum + pension,
//           0,
//         );
        
//         const TAUXB = sumAmountAlreadyPaid>0? sumAmountAlreadyPaid / expectedAmount * 100:0;
//           const numberOfStudentsNotPaid = numberOfStudents - numberOfStudentsCompletedFee;
//           const TAUXC =  numberOfStudentsNotPaid>0? numberOfStudentsNotPaid / numberOfStudents * 100:0;
//           const amountRest = expectedAmount - sumAmountAlreadyPaid;
//           const TAUXD = amountRest>0? amountRest / expectedAmount * 100:0;
  
//           sectionStatistics.push({
//             sectionName: section.name,
//             className: cycleClass.name,
//             numberOfStudents,
//             expectedAmount,
//             numberOfStudentsCompletedFee,
//             TAUXA,
//             sumAmountAlreadyPaid,
//             TAUXB,
//             numberOfStudentsNotPaid,
//             TAUXC,
//             amountRest,
//             TAUXD,
//         });
//       }
//     }
//     }
//   }

//   return sectionStatistics;

// }

// async getGeneralFrancophoneFirstInstalmentSectionStatistics(): Promise<SectionStatistics[]>{

//   const sections = await this.sectionservice.getAllForUseFrancophone()

//   const sectionStatistics: SectionStatistics[] = [];

//   for (const section of sections) {
//     for (const cycle of section.cycle.getItems()) {
//       for (const niveauclass of cycle.niveauEtude.getItems()){
//         for (const cycleClass of niveauclass.salle.getItems()) {
//         const numberOfStudents = Number(await this.numberOfStudentsStartedPayingFirstInstalment())
//         const expectedAmount = cycleClass.montantPensionSalle * numberOfStudents;
//         const numberOfStudentsCompletedFee = (this.getallStudentswhohaveCompletedAdmissionFee).length
//         const  TAUXA= numberOfStudentsCompletedFee >0? numberOfStudentsCompletedFee / numberOfStudents * 100 : 0
//         const a = cycleClass.student.getItems()
//         console.log('=============>'+a)
//         const c = a.map(a=>a.pension)
//         console.log("===========>"+c)
//         // const b = a.map(a => a.pension.toArray().reduce(
//         //   (sum, pension) => sum + pension.montantPension,
//         //   0,
//         // ));
//         // console.log("==========>"+b)
//         const b = a.map(a => {
//           const pensions = a.pension.getItems();
//           return pensions.reduce((sum, pension) => sum + pension.montantPension, 0);
//         });
//         console.log("===========>"+b)
        
//         const sumAmountAlreadyPaid= b.reduce(
//           (sum, pension) => sum + pension,
//           0,
//         );
        
//         const TAUXB = sumAmountAlreadyPaid>0? sumAmountAlreadyPaid / expectedAmount * 100:0;
//           const numberOfStudentsNotPaid = numberOfStudents - numberOfStudentsCompletedFee;
//           const TAUXC =  numberOfStudentsNotPaid>0? numberOfStudentsNotPaid / numberOfStudents * 100:0;
//           const amountRest = expectedAmount - sumAmountAlreadyPaid;
//           const TAUXD = amountRest>0? amountRest / expectedAmount * 100:0;
  
//           sectionStatistics.push({
//             sectionName: section.name,
//             className: cycleClass.name,
//             numberOfStudents,
//             expectedAmount,
//             numberOfStudentsCompletedFee,
//             TAUXA,
//             sumAmountAlreadyPaid,
//             TAUXB,
//             numberOfStudentsNotPaid,
//             TAUXC,
//             amountRest,
//             TAUXD,
//         });
//       }
//     }
//     }
//   }

//   return sectionStatistics;

// }