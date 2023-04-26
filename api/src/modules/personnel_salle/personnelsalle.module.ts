/* eslint-disable prettier/prettier */
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { PersonnelSalle } from "src/entities/personnelsalle.entity";
import { PersonnelModule } from "../personnel/personnel.module";
import { SalleModule } from "../salle/salle.module";
import { PersonnelSalleResolver } from "./personnelsalle.resolver";
import { PersonnelSalleService } from "./personnelsalle.service";

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [PersonnelSalle] }),
    ],
    providers:[PersonnelSalleService,PersonnelSalleResolver],
    exports:[PersonnelSalleService]
})
export class PersonnelSalleModule {}