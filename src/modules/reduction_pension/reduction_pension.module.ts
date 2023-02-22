/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ReductionScolarite } from 'src/entities/reduction-scolarite.entity';
import { CategoriePrimeModule } from '../categorie_prime/categorie_prime.module';
import { ReductionScolariteResolver } from './reduction-scolarite.resolver';
import { ReductionScolariteService } from './reduction-scolarite.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [ReductionScolarite] }),
    ],
    providers:[ReductionScolariteService,ReductionScolariteResolver],
    exports:[ReductionScolariteService]
})
export class ReductionPensionModule {}
