/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Tranche } from 'src/entities/tranche.entity';
import { TrancheResolver } from './tranche.resolver';
import { TrancheService } from './tranche.service';
import { ParamaterModule } from '../parameter/parameter.module';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Tranche] }),
        ParamaterModule
     
    ],
    providers:[TrancheService,TrancheResolver],
    exports:[TrancheService]
})
export class TrancheModule {}
