/* eslint-disable prettier/prettier */

import { EntityManager, EntityRepository, FilterQuery, wrap } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { Expense } from "src/entities/expense.entity";
import { ExpenseCreateInput } from "./dto/expense.create.input";
import { ExpenseUpdateInput } from "./dto/expense.update.input";
import { PensionService } from "../pension/pension.service";
import { SalaireService } from "../salaire/salaire.service";
import { format } from "date-fns";



@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private ExpenseRepository: EntityRepository<Expense>,
    private readonly em: EntityManager,
    @Inject(forwardRef(() => PensionService))
    private pensionservice:PensionService,
    private salaireservice: SalaireService
  ) {}

async findall(){
    return await this.ExpenseRepository.findAll()
}

async findByOne(filters: FilterQuery<Expense>): Promise<Expense | null> {
    return await this.ExpenseRepository.findOne(filters);
  }

async findbyid(id:string){
   return await this.ExpenseRepository.findOne(id)
}

  
async create(input: ExpenseCreateInput){
    const expense = new Expense()
    wrap(expense).assign(
        {
         anneeAccademique: input.academicyearId,
         student: input.studentId,
         personnel:input.personnelId,
         debitamount:input.debit,
         creditamount:input.credit,
        },
        {
            em: this.em
        }
    )

    await this.ExpenseRepository.persistAndFlush(expense)
    return expense
}

async update(id:string, input: ExpenseUpdateInput){
    const expense= await this.findByOne(id)

    if(!expense){
        throw Error("Expense not found")
    }

    wrap(expense).assign(
        {
         anneeAccademique: input.academicyearId,
         student: input.studentId,
         personnel:input.personnelId,
         debitamount:input.debit,
         creditamount:input.credit,
         createdAt:format(new Date(),'dd/MM/yyyy')
        },
        {
            em: this.em
        }
    )

    await this.ExpenseRepository.persistAndFlush(expense)
    return expense

}

async delete(id:string){
    const expense = await this.findByOne(id)

    if(!expense){
        throw Error("expense not found")
    }

    await this.ExpenseRepository.removeAndFlush(expense)
    return expense

}

async savePensionExpense(studentid: string){
    const pension = await this.pensionservice.findpensionbystudent(studentid)

    if(pension){
        const montantpension = pension.montantPension
        const expense = new Expense()

        wrap(expense).assign({
            student: studentid,
            creditamount: montantpension,
        },
        {
            em:this.em
        })
        const depense = await this.findexpensebystudent(studentid)
        if(depense){
            await this.ExpenseRepository.removeAndFlush(depense)
            console.log(depense)
            await this.ExpenseRepository.persistAndFlush(expense)
            return expense
        }
        if(!depense){
        await this.ExpenseRepository.persistAndFlush(expense)
        return expense
        }
    }

    if(!pension){
        throw Error("!!!!!!!!!!!!!!!!pension for this student has not being found!!!!!!!!!!!!!!!!!!!!!!!")
    }
}



async saveSalaireExpenses(personnelid: string){
    const salaires =  await this.salaireservice.salairepersonnel(personnelid)

    if(salaires.length>0){
        const salairemontant = salaires.map(a=>a.montant).reduce(function(a,b){return a+b})
        const expense = new Expense()

        wrap(expense).assign({
            personnel: personnelid,
            debitamount: salairemontant,
        },
        {
            em:this.em
        })
   
        await this.ExpenseRepository.persistAndFlush(expense)
        return expense


    }
    if(salaires.length==0){
        throw Error("!!!!!!!!!!!!!!!!!!!no salary has being paied to this personnel!!!!!!!!!!!!!!!!!!!!!!!")
    }   
}

async findexpensebystudent(studentid:string){
 return await this.ExpenseRepository.findOne({student:studentid})
}
  
}