/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, forwardRef } from '@nestjs/common';
import { PrimePersonnel } from 'src/entities/prime-personnel.entity';
import { PersonnelModule } from '../personnel/personnel.module';
import { PrimeModule } from '../prime/prime.module';
import { PrimePersonnelResolver } from './prime-personnel.resolver';
import { PrimePersonnelService } from './prime-personnel.service';
import { SalaireModule } from '../salaire/salaire.module';
import { PaySalaryModule } from '../paysalary/paysalary.module';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [PrimePersonnel] }),
        PrimeModule,
        PersonnelModule,
        forwardRef(() =>SalaireModule),
        PaySalaryModule
    ],
    providers:[PrimePersonnelService,PrimePersonnelResolver],
    exports:[PrimePersonnelService]
})
export class PrimePersonnelModule {}
