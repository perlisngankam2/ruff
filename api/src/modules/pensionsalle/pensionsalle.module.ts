/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { NiveauEtude } from 'src/entities/niveau-etude.entity';
import { Pension } from 'src/entities/pension.entity';
import { AnneAccademiqueModule } from '../anne_accademique/anne_accademique.module';
import { NiveauEtudeModule } from '../niveau_etude/niveau_etude.module';
import { SalleModule } from '../salle/salle.module';
import {  PensionSalleResolver } from './pensionsalle.resolver';
import { PensionSalleService } from './pensionsalle.service';
import { PensionSalle } from 'src/entities/pensionsalle.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserModule } from '../user/user.module';


@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [PensionSalle] }),
        AnneAccademiqueModule,
        SalleModule,
        UserModule
    ],
    providers:[PensionSalleService,PensionSalleResolver, RolesGuard],
    exports:[PensionSalleService]
})
export class PensionSalleModule {}
