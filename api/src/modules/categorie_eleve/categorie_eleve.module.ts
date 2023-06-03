/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CategorieEleve } from 'src/entities/categorie-eleve.entity';
import { ReductionPensionModule } from '../reduction_pension/reduction_pension.module';
import { CategorieEleveResolver } from './categorie-eleve.resolver';
import { CategorieEleveService } from './categorie-eleve.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserModule } from '../user/user.module';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [CategorieEleve] }),
        ReductionPensionModule,
        UserModule,

    ],
    providers:[CategorieEleveService,CategorieEleveResolver, RolesGuard],
    exports:[CategorieEleveService]
})
export class CategorieEleveModule {}
