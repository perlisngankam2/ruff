/* eslint-disable prettier/prettier */
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Expense } from "src/entities/expense.entity";
import { AnneAccademiqueModule } from "../anne_accademique/anne_accademique.module";
import { ExpenseResolver } from "./expense.resolver";
import { ExpenseService } from "./expense.service";


@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Expense] }),
        AnneAccademiqueModule
    ],
    providers:[ExpenseService,ExpenseResolver],
    exports:[ExpenseService]
})
export class ExpenseModule{}