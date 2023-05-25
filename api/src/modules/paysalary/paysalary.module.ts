/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, forwardRef } from '@nestjs/common';
import { PersonnelModule } from '../personnel/personnel.module';
import { PrimePersonnelModule } from '../prime_personnel/prime_personnel.module';
import { RetenuPersonnelModule } from '../retenu_personnel/retenu_personnel.module';
import { PaySalaryResolver } from './paysalary.resolver';
import { PaySalary } from 'src/entities/paysalary.entity';
import { PaySalaryService } from './paysalary.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserModule } from '../user/user.module';






@Module({
imports:[MikroOrmModule.forFeature({ entities: [PaySalary] }),
 RetenuPersonnelModule,
 PersonnelModule,
 forwardRef(() =>PrimePersonnelModule,),
 UserModule
],
providers:[PaySalaryService,PaySalaryResolver,RolesGuard],
exports:[PaySalaryService]
})
export class PaySalaryModule {}