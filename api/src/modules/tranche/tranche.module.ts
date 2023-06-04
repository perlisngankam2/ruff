/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, forwardRef } from '@nestjs/common';
import { Tranche } from 'src/entities/tranche.entity';
import { TrancheResolver } from './tranche.resolver';
import { TrancheService } from './tranche.service';
import { ParamaterModule } from '../parameter/parameter.module';
import { StudentModule } from '../student/student.module';
import { TrancheStudentModule } from '../tranche-student/tranche-student.module';
import { PensionSalleModule } from '../pensionsalle/pensionsalle.module';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserModule } from '../user/user.module';
import { SalleModule } from '../salle/salle.module';


@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Tranche] }),
        ParamaterModule,
        forwardRef(() =>StudentModule),
        TrancheStudentModule,
        PensionSalleModule,
        UserModule,
        SalleModule
     
    ],
    providers:[TrancheService,TrancheResolver, RolesGuard],
    exports:[TrancheService]
})
export class TrancheModule {}
