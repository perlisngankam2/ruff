/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CategoriePersonnel } from 'src/entities/categorie-personnel.entity';
import { PrimeModule } from '../prime/prime.module';
import { RetenuSalarialModule } from '../retenu_salarial/retenu_salarial.module';
import { SalaireBaseModule } from '../salaire_base/salaire_base.module';
import { CategoriePersonnelResolver } from './categorie-personnel.resolver';
import { CategoriePersonnelService } from './categorie-personnel.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserModule } from '../user/user.module';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [CategoriePersonnel] }),
        PrimeModule,
        RetenuSalarialModule,
        SalaireBaseModule,
        UserModule
    ],
    providers:[CategoriePersonnelService,CategoriePersonnelResolver,RolesGuard],
    exports:[CategoriePersonnelService]
})
export class CategoriePersonnelModule {}
