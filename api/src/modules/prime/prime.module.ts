/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Prime } from 'src/entities/prime.entity';
import { CategoriePrimeModule } from '../categorie_prime/categorie_prime.module';
import { PrimeResolver } from './prime.resolver';
import { PrimeService } from './prime.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserModule } from '../user/user.module';


@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Prime] }),
        CategoriePrimeModule,
        UserModule,

    ],
    providers:[PrimeService,PrimeResolver, RolesGuard],
    exports:[PrimeService]
})
export class PrimeModule {}
