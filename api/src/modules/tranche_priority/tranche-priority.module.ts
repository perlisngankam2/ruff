/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';
import { TranchePriorityResolver } from './tranche-priority.resolver';
import { TranchePriorityService } from './tranche-priority.service';
import { TranchePriority } from 'src/entities/tranche-priority.entity';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [TranchePriority] }),
    ],
    providers:[TranchePriorityService,TranchePriorityResolver],
    exports:[TranchePriorityService]
})
export class TranchePriorityModule {}
