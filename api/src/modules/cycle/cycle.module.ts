/* eslint-disable prettier/prettier */
import { Section } from './../../entities/section.entity';
import { SectionModule } from './../section/section.module';
import { SectionService } from './../section/section.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Cycle } from 'src/entities/cycle.entity';
import { CycleResolver } from './cycle.resolver';
import { CycleService } from './cycle.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserModule } from '../user/user.module';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Cycle,Section] }),
        SectionModule,
        UserModule
    ],
    providers:[CycleService,CycleResolver,SectionService, RolesGuard],
    exports:[CycleService]
})
export class CycleModule {}
