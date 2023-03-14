/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Salaire } from 'src/entities/salaire.entity';
import { PeriodeModule } from '../periode/periode.module';
import { PersonnelModule } from '../personnel/personnel.module';
import { PrimeModule } from '../prime/prime.module';
import { PrimePersonnelModule } from '../prime_personnel/prime_personnel.module';
import { RetenuPersonnelModule } from '../retenu_personnel/retenu_personnel.module';
import { SalaireResolver } from './salaire.resolver';
import { SalaireService } from './salaire.service';




@Module({
imports:[MikroOrmModule.forFeature({ entities: [Salaire] }),
 RetenuPersonnelModule,
 PrimePersonnelModule,
 PeriodeModule,
 PersonnelModule,
 PrimeModule
],
providers:[SalaireService,SalaireResolver],
exports:[SalaireService]
})
export class SalaireModule {}
