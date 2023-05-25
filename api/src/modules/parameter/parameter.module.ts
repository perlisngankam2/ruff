/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Parameter } from 'src/entities/parameter.entity';
// import { AnneAccademiqueModule } from '../anne_accademique/anne_accademique.module';
import { ParameterService } from './parameter.service';
import { ParameterResolver } from './parameter.resolver';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserModule } from '../user/user.module';


@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Parameter] }),
        // AnneAccademiqueModule
        UserModule,

    ],
    providers:[ParameterService,ParameterResolver, RolesGuard],
    exports:[ParameterService]
})
export class ParamaterModule {}