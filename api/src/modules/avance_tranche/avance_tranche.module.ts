/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';
import { AvanceTranche } from '../../entities/avance-tranche.entity';
import { TrancheStudent } from 'src/entities/tranche-student.entity';
import { TrancheStudentModule } from '../tranche-student/tranche-student.module';
import { AvanceTrancheService } from './avance-tranche.service';
import { AvanceTrancheResolver } from './avance-tranche.resolver';
import { TrancheModule } from '../tranche/tranche.module';
import { StudentModule } from '../student/student.module';
import { PensionModule } from '../pension/pension.module';
import { AnneAccademiqueModule } from '../anne_accademique/anne_accademique.module';
import { ParamaterModule } from '../parameter/parameter.module';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserModule } from '../user/user.module';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [AvanceTranche] }),
        forwardRef(() => TrancheStudentModule),
        forwardRef(() =>TrancheModule),
        forwardRef(() =>StudentModule),
        forwardRef(() =>PensionModule),
        UserModule,
        ParamaterModule
        // AnneAccademiqueModule
    ],
    providers:[AvanceTrancheService,AvanceTrancheResolver,RolesGuard],
    exports:[AvanceTrancheService]
})
export class AvanceTrancheModule {}
