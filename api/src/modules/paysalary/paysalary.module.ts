/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Salaire } from 'src/entities/salaire.entity';
import { PeriodeModule } from '../periode/periode.module';
import { PersonnelModule } from '../personnel/personnel.module';
import { PrimeModule } from '../prime/prime.module';
import { PrimePersonnelModule } from '../prime_personnel/prime_personnel.module';
import { RetenuPersonnelModule } from '../retenu_personnel/retenu_personnel.module';
import { PaySalaire } from 'src/entities/pay_salary.entity';
import { PaySalaireResolver } from './paysalary.resolver';
import { PaySalaireService } from './paysalary.service';






@Module({
imports:[MikroOrmModule.forFeature({ entities: [PaySalaire] }),
 RetenuPersonnelModule,
 PrimePersonnelModule,
 PeriodeModule,
 PersonnelModule,
 PrimeModule,

],
providers:[PaySalaireService,PaySalaireResolver],
exports:[PaySalaireService]
})
export class PaySalaireModule {}