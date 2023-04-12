/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Tranche } from 'src/entities/tranche.entity';
import { TrancheResolver } from './tranche.resolver';
import { TrancheService } from './tranche.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Tranche] }),
     
    ],
    providers:[TrancheService,TrancheResolver],
    exports:[TrancheService]
})
export class TrancheModule {}
