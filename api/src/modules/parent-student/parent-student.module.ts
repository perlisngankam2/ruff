/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ParentStudent } from 'src/entities/parentStudent.entity';
import { ParentModule } from '../parent/parent.module';
import { StudentModule } from '../student/student.module';
import { ParentStudentResolver } from './parent-student.resolver';
import { ParentStudentService } from './parent-student.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [ParentStudent] }),
        StudentModule,
        ParentModule
    ],
    providers:[ParentStudentResolver,ParentStudentService],
    exports:[ParentStudentService]
})
export class ParentStudentModule {}
