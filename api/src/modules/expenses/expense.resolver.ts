/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Expense } from "src/entities/expense.entity";
import { ExpenseCreateInput } from "./dto/expense.create.input";
import { ExpenseUpdateInput } from "./dto/expense.update.input";
import { ExpenseService } from "./expense.service";
import { ExpensePaginatedResponse } from "./type/expensepagination";
import { PaginationInput } from "src/pagination";
import { RolesGuard } from "../auth/guards/roles.guard";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";
import { Role } from "../auth/roles/roles";
import { Roles } from "../auth/decorators/roles.decorator";


@Resolver(() => Expense)
export class ExpenseResolver {
  constructor(private readonly expenseService: ExpenseService) {}

  @Mutation(()=>Expense)
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.ECONOME)
  async createExpense(@Args('input') input: ExpenseCreateInput){
    return await this.expenseService.create(input)
  }

  @Query(() => ExpensePaginatedResponse)
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.ECONOME)
  async pagiantionResponseExpense(
    @Args('pagination') pagination: PaginationInput,
  ): Promise<ExpensePaginatedResponse> {
    return await this.expenseService.pagiantionResponseExpense(pagination);
  }

  @Mutation(()=>Expense)
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.ECONOME)
  async updateExpense(@Args('id') id: string,@Args('input') input: ExpenseUpdateInput){
    return await this.expenseService.update(id,input)
  }
  
  @Mutation(()=>Expense)
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.ECONOME)
  async deleteExpense(@Args('id') id: string){
    return await this.expenseService.delete(id)
  }

  @Query(()=>Expense)
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.ECONOME)
  async findoneexpense(@Args('id') id: string){
    return await this.expenseService.findByOne(id)
  }

  @Query(()=>[Expense])
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.ECONOME)
  async findallexpenses(){
    return await this.expenseService.findall()
  }

}