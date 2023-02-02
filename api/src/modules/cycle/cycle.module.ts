/* eslint-disable prettier/prettier */
import { Section } from './../../entities/section.entity';
import { SectionModule } from './../section/section.module';
import { SectionService } from './../section/section.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Cycle } from 'src/entities/cycle.entity';
import { CycleResolver } from './cycle.resolver';
import { CycleService } from './cycle.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Cycle,Section] }),
        SectionModule
    ],
    providers:[CycleService,CycleResolver,SectionService],
    exports:[CycleService]
})
export class CycleModule {}
