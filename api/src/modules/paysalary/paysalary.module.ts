/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PersonnelModule } from '../personnel/personnel.module';
import { PrimePersonnelModule } from '../prime_personnel/prime_personnel.module';
import { RetenuPersonnelModule } from '../retenu_personnel/retenu_personnel.module';
import { PaySalaryResolver } from './paysalary.resolver';
import { PaySalary } from 'src/entities/paysalary.entity';
import { PaySalaryService } from './paysalary.service';






@Module({
imports:[MikroOrmModule.forFeature({ entities: [PaySalary] }),
 RetenuPersonnelModule,
 PrimePersonnelModule,
 PersonnelModule,
],
providers:[PaySalaryService,PaySalaryResolver],
exports:[PaySalaryService]
})
export class PaySalaryModule {}