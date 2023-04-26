/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, forwardRef } from '@nestjs/common';
import { Salaire } from 'src/entities/salaire.entity';
import { PeriodeModule } from '../periode/periode.module';
import { PersonnelModule } from '../personnel/personnel.module';
import { PrimeModule } from '../prime/prime.module';
import { PrimePersonnelModule } from '../prime_personnel/prime_personnel.module';
import { RetenuPersonnelModule } from '../retenu_personnel/retenu_personnel.module';
import { SalaireResolver } from './salaire.resolver';
import { SalaireService } from './salaire.service';
import { ExpenseModule } from '../expenses/expense.module';
import { PaySalaryModule } from '../paysalary/paysalary.module';




@Module({
imports:[MikroOrmModule.forFeature({ entities: [Salaire] }),
 RetenuPersonnelModule,
 PrimePersonnelModule,
 PeriodeModule,
 PersonnelModule,
 PrimeModule,
 PaySalaryModule,
 forwardRef(() => ExpenseModule)
],
providers:[SalaireService,SalaireResolver],
exports:[SalaireService]
})
export class SalaireModule {}
