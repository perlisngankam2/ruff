/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { RetenuPersonnel } from 'src/entities/retenu-personnel.entity';
import { PersonnelModule } from '../personnel/personnel.module';
import { RetenuSalarialModule } from '../retenu_salarial/retenu_salarial.module';
import { RetenuPersonnelResolver } from './retenu-personnel.resolver';
import { RetenuPersonnelService } from './retenu-personnel.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserModule } from '../user/user.module';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [RetenuPersonnel] }),
        RetenuSalarialModule,
        PersonnelModule,
        UserModule
    ],
    providers:[RetenuPersonnelService,RetenuPersonnelResolver, RolesGuard],
    exports:[RetenuPersonnelService]
})
export class RetenuPersonnelModule {}
