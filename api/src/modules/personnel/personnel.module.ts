/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Personnel } from 'src/entities/pesonnel.entity';
import { UserModule } from '../user/user.module';
import { PersonnelResolver } from './personnel.resolver';
import { PersonnelService } from './personnel.service';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Personnel] }),
        UserModule
    ],
    providers:[PersonnelResolver,PersonnelService,RolesGuard],
    exports:[PersonnelService]
})
export class PersonnelModule {}
