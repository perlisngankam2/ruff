/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Section } from 'src/entities/section.entity';
import { SectionResolver } from './section.resolver';
import { SectionService } from './section.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserModule } from '../user/user.module';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Section] }),
        UserModule
    ],
    providers:[SectionService,SectionResolver, RolesGuard],
    exports:[SectionService]
})
export class SectionModule {}
