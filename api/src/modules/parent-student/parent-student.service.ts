/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    EntityManager,
    FilterQuery,
    NotFoundError,
    wrap,
  } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Field, ID, ObjectType} from '@nestjs/graphql';
import { Parent } from 'src/entities/parent.entity';
import { UserService } from '../user/user.service';
import { ParentStudent } from 'src/entities/parentStudent.entity';
import { StudentService } from '../student/student.service';
import { ParentService } from '../parent/parent.service';
import { ParentStudentCreateInput } from './dto/parent-student.createinput';
import { ParentStudentUpdateInput } from './dto/parent-student.updateinput';

@Entity()
@ObjectType()
export class ParentStudentService {
    constructor(
        @InjectRepository(ParentStudent)
        private parentstudentRepository: EntityRepository<ParentStudent>,
        private studentService : StudentService,
        private parentService : ParentService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: ParentStudentCreateInput,
      ): Promise<ParentStudent> {        
        const parentstudent = new ParentStudent()
        wrap(parentstudent).assign({
          parent: input.parentId,
          student: input.studentId
        },
        {
            em:this.em
        })
      
        
        await this.parentstudentRepository.persistAndFlush(parentstudent)
        return parentstudent
      }
    
      findOne(filters: FilterQuery<ParentStudent>): Promise<ParentStudent | null> {
        return this.parentstudentRepository.findOne(filters);
      }
      findById(id:string){
        return this.parentstudentRepository.findOne(id)
      }
    
      getAll(): Promise<ParentStudent[]> {
        return this.parentstudentRepository.findAll({
          populate: ['parent','student']
        })
      }
      
      async update(id:string, input: ParentStudentUpdateInput): Promise<ParentStudent> {
        const parentstudent =await this.findById(id)
        // if(input.user){
        //     const user =
        //     input.user?.ID &&
        //       (await this.userService.findOne({ id: input.user?.ID }));

        //       if (!user) {
        //         throw new NotFoundError('user no exist' || '');
        //       }
        //       this.userService.update(user.id, input.user);
        // }
        wrap(parentstudent).assign({
            student: input.studentId,
            parent: input.parentId
            },
            { em: this.em },
        );
        await this.parentstudentRepository.persistAndFlush(parentstudent);
        return parentstudent;
      }
      async delete(id:string){
        const a = this.findById(id)
        await this.parentstudentRepository.removeAndFlush(a)
        if(!a){
        throw Error("not found")
        }
        return a
      }   
}