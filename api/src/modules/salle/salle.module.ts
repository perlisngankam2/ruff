/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Salle } from '../../entities/salle.entity';

import { NiveauEtudeModule } from '../niveau_etude/niveau_etude.module';
import { SalleResolver } from './salle.resolver';
import { SalleService } from './salle.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserModule } from '../user/user.module';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities:[Salle]}),
        UserModule,
        NiveauEtudeModule
    ],
    providers:[SalleService,SalleResolver, RolesGuard],
    exports:[SalleService]
})
export class SalleModule {}
