/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';
import { AvanceTranche } from '../../entities/avance-tranche.entity';
import { TrancheStudent } from 'src/entities/tranche-student.entity';
import { TrancheStudentModule } from '../tranche-student/tranche-student.module';
import { AvanceTrancheService } from './avance-tranche.service';
import { AvanceTrancheResolver } from './avance-tranche.resolver';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [AvanceTranche] }),
        forwardRef(() => TrancheStudentModule)
    ],
    providers:[AvanceTrancheService,AvanceTrancheResolver],
    exports:[AvanceTrancheService]
})
export class AvanceTrancheModule {}
