/* eslint-disable prettier/prettier */
import { EntityManager, EntityRepository, FilterQuery, wrap } from "@mikro-orm/core"
import { InjectRepository } from "@mikro-orm/nestjs"
import { Injectable } from "@nestjs/common"
import { Course } from "src/entities/course.entity"
import { CourseCreateInput } from "./dto/course.createinput"


@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private courseRepository: EntityRepository<Course>,
        private  em: EntityManager,
      ) {}
    
    async create(
        input: CourseCreateInput,
      ): Promise<Course> {  
        const course = new Course()
        wrap(course).assign({
        title:input.title,
         time: Number(input.time)
        },
        {
            em: this.em
        })

        await this.courseRepository.persistAndFlush(course)
        return course

}

async findall(){
    return await this.courseRepository.findAll()
}

findByOne(filters: FilterQuery<Course>): Promise<Course | null> {
    return this.courseRepository.findOne(filters);
  }

findById(id:string){
    return this.courseRepository.findOne(id)
}

async delete(id:string){
    const a = this.findById(id)
    await this.courseRepository.nativeDelete(await a)
    if(!a){
    throw Error("not found")
    }
    return a
    }

}