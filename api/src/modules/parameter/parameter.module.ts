/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Parameter } from 'src/entities/parameter.entity';
import { AnneAccademiqueModule } from '../anne_accademique/anne_accademique.module';
import { ParameterService } from './parameter.service';
import { ParameterResolver } from './parameter.resolver';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Parameter] }),
        // AnneAccademiqueModule
    ],
    providers:[ParameterService,ParameterResolver],
    exports:[ParameterService]
})
export class ParamaterModule {}