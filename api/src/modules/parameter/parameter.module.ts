/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, forwardRef } from '@nestjs/common';
import { Parameter } from 'src/entities/parameter.entity';
import { ParameterService } from './parameter.service';
import { ParameterResolver } from './parameter.resolver';
import { AnneAccademiqueModule } from '../anne_accademique/anne_accademique.module';

import { RolesGuard } from '../auth/guards/roles.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Parameter] }),
    forwardRef(() => AnneAccademiqueModule),
    // AnneAccademiqueModule,
    UserModule,
  ],
  providers: [ParameterService, ParameterResolver, RolesGuard],
  exports: [ParameterService],
})
export class ParamaterModule {}
