/* eslint-disable prettier/prettier */
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module, forwardRef } from "@nestjs/common";
import { Expense } from "src/entities/expense.entity";
import { AnneAccademiqueModule } from "../anne_accademique/anne_accademique.module";
import { ExpenseResolver } from "./expense.resolver";
import { ExpenseService } from "./expense.service";
import { PensionModule } from "../pension/pension.module";
import { SalaireModule } from "../salaire/salaire.module";
import { AvanceTrancheModule } from "../avance_tranche/avance_tranche.module";
import { PaySalaryModule } from "../paysalary/paysalary.module";


@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Expense] }),
        AnneAccademiqueModule,
        AvanceTrancheModule,
        PaySalaryModule,
        forwardRef(() => PensionModule),
        forwardRef(() => SalaireModule)
    ],
    providers:[ExpenseService,ExpenseResolver],
    exports:[ExpenseService]
})
export class ExpenseModule{}