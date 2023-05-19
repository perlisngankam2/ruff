/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, forwardRef } from '@nestjs/common';
import { Tranche } from 'src/entities/tranche.entity';
import { TrancheResolver } from './tranche.resolver';
import { TrancheService } from './tranche.service';
import { ParamaterModule } from '../parameter/parameter.module';
import { StudentModule } from '../student/student.module';
import { TrancheStudentModule } from '../tranche-student/tranche-student.module';


@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Tranche] }),
        ParamaterModule,
        forwardRef(() =>StudentModule),
        TrancheStudentModule
     
    ],
    providers:[TrancheService,TrancheResolver],
    exports:[TrancheService]
})
export class TrancheModule {}
