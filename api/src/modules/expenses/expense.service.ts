/* eslint-disable prettier/prettier */

import { EntityManager, EntityRepository, FilterQuery, wrap } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Expense } from "src/entities/expense.entity";
import { ExpenseCreateInput } from "./dto/expense.create.input";
import { ExpenseUpdateInput } from "./dto/expense.update.input";



@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private ExpenseRepository: EntityRepository<Expense>,
    private readonly em: EntityManager,
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
         title: input.title,
         amount: Number(input.amount),
         description: input.description
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

    wrap(expense).assign({
        anneeAccademique: input.academicyearId,
        title: input.title,
        amount: Number(input.amount),
        description: input.description
    },
    {
        em: this.em
    })

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


  
}