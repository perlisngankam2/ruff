/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { NiveauEtude } from 'src/entities/niveau-etude.entity';
import { SectionCycleModule } from '../section-cycle/section-cycle.module';
import { NiveauEtudeResolver } from './niveau-etude.resolver';
import { NiveauEtudeService } from './niveau-etude.service';
import { CycleModule } from '../cycle/cycle.module';
import { CycleService } from '../cycle/cycle.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserModule } from '../user/user.module';


@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [NiveauEtude] }),
        SectionCycleModule,
        CycleModule,
        UserModule,

    ],
    providers:[NiveauEtudeService,NiveauEtudeResolver, RolesGuard],
    exports:[NiveauEtudeService]
})
export class NiveauEtudeModule {}
