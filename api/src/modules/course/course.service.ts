/* eslint-disable prettier/prettier */
import { EntityManager, EntityRepository, FilterQuery, wrap } from "@mikro-orm/core"
import { InjectRepository } from "@mikro-orm/nestjs"
import { Injectable } from "@nestjs/common"
import { Course } from "src/entities/course.entity"
import { CourseCreateInput } from "./dto/course.createinput"
import { CourseUpdateInput } from "./dto/course.updateinput"


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

async update(
  id:string,input: CourseUpdateInput,
): Promise<Course> {  

  const course = this.findById(id)
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
    await this.courseRepository.removeAndFlush(await a)
    if(!a){
    throw Error("not found")
    }
    return a
    }

// async delete(ids: string[]){
//   for(const id of ids){
//     const a = this.findById(id)
//     await this.courseRepository.nativeDelete(await a)
//     if(!a){
//       throw Error("not found")
//     }
//   // return a;
//   }
// }

// async delete(ids: string[]): Promise<Course[]> {
//   const result: Course[] = [];
//   for(const id of ids){2
//     const a = this.findById(id)
//     await this.courseRepository.nativeDelete(await a)
//     const  title = a.title, 
//     if(!a){
//       throw Error("not found")
//     }
//   return a;
//   }
// }

// async delete(ids: string[]) {
//     const a = await this.findById(ids);
    
//     if(!a){
//           throw Error("not found")
//           }

//     await this.courseRepository.removeAndFlush(a);

//     return a;
// }

}