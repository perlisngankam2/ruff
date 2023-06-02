/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SalaireBase } from 'src/entities/salaire-base.entity';
import { SalaireBaseResolver } from './salaire-base.resolver';
import { SalaireBaseService } from './salaire-base.service';
import { UserModule } from '../user/user.module';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [SalaireBase] }),
        UserModule
    ],
    providers:[SalaireBaseService,SalaireBaseResolver, RolesGuard],
    exports:[SalaireBaseService]
})
export class SalaireBaseModule {}
