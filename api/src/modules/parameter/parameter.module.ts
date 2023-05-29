/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, forwardRef } from '@nestjs/common';
import { Parameter } from 'src/entities/parameter.entity';
import { ParameterService } from './parameter.service';
import { ParameterResolver } from './parameter.resolver';
import { AnneAccademiqueModule } from '../anne_accademique/anne_accademique.module';


@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Parameter] }),
        forwardRef(()=>AnneAccademiqueModule)
    ],
    providers:[ParameterService,ParameterResolver],
    exports:[ParameterService]
})
export class ParamaterModule {}