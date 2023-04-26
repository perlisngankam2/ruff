/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Expense } from "src/entities/expense.entity";
import { ExpenseCreateInput } from "./dto/expense.create.input";
import { ExpenseUpdateInput } from "./dto/expense.update.input";
import { ExpenseService } from "./expense.service";





@Resolver(() => Expense)
export class ExpenseResolver {
  constructor(private readonly expenseService: ExpenseService) {}


  @Mutation(()=>Expense)
  async createExpense(@Args('input') input: ExpenseCreateInput){
    return await this.expenseService.create(input)
  }

  @Mutation(()=>Expense)
  async updateExpense(@Args('id') id: string,@Args('input') input: ExpenseUpdateInput){
    return await this.expenseService.update(id,input)
  }
  
  @Mutation(()=>Expense)
  async deleteExpense(@Args('id') id: string){
    return await this.expenseService.delete(id)
  }

  @Query(()=>Expense)
  async findoneexpense(@Args('id') id: string){
    return await this.expenseService.findByOne(id)
  }

  @Query(()=>[Expense])
  async findallexpenses(){
    return await this.expenseService.findall()
  }

}