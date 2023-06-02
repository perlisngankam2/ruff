/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Retenue } from 'src/entities/retenu-salaire.entity';
import { CategorieRetenuModule } from '../categorie_retenu/categorie_retenu.module';
import { RetenuResolver } from './retenu.reesolver';
import { RetenuService } from './retenu.service';
import { UserModule } from "../user/user.module";
import { RolesGuard } from "../auth/guards/roles.guard";

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Retenue] }),
        CategorieRetenuModule,
        UserModule

    ],
    providers:[RetenuService,RetenuResolver, RolesGuard],
    exports:[RetenuService]
})
export class RetenuSalarialModule {}
