/* eslint-disable prettier/prettier */
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { File } from "src/entities/file.entity";

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [File] }),
    ],
    providers:[FileService],
    exports:[FileService]
})
export class FileModule{}