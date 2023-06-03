/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, forwardRef } from '@nestjs/common';
import { AnneeAccademique } from 'src/entities/annee-accademique.entity';
import { AnneeAccademiqueResolver } from './anne-accademique.resolver';
import { AnneeAccademiqueService } from './anne-accademique.service';
import { ParamaterModule } from '../parameter/parameter.module';
// import { PensionModule } from '../pension/pension.module';
// import { TrancheModule } from '../tranche/tranche.module';
// import { TrancheStudentModule } from '../tranche-student/tranche-student.module';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserModule } from '../user/user.module';


@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [AnneeAccademique] }),
        forwardRef(()=>ParamaterModule),
        // ParamaterModule,
        UserModule
        // PensionModule,
        // TrancheModule,
        // TrancheStudentModule
    ],
    providers:[AnneeAccademiqueService,AnneeAccademiqueResolver, RolesGuard],
    exports:[AnneeAccademiqueService]
})
export class AnneAccademiqueModule {}
