/* eslint-disable prettier/prettier */
import {  EntityManager, EntityRepository, FilterQuery, wrap } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { PersonnelSalle } from "src/entities/personnelsalle.entity";
import { PersonnelSalleCreateInput } from "./dto/personnelsalle.create.input";
import { SalleService } from "../salle/salle.service";
import { PersonnelService } from "../personnel/personnel.service";
import { CourseService } from "../course/course.service";

@Injectable()
export class PersonnelSalleService {
    constructor(
        @InjectRepository(PersonnelSalle)
        private personnelsalleRepository: EntityRepository<PersonnelSalle>,
        private salleservice: SalleService,
        private personnelService: PersonnelService,
        private courseservice: CourseService,
        private  em: EntityManager,
      ) {}
    
    async create(
        input: PersonnelSalleCreateInput,
      ): Promise<PersonnelSalle> {  
        const personnelsalle = new PersonnelSalle()
        const salle= await this.salleservice.findByOne(input.salleId)
        const personnel = await this.personnelService.findById(input.personnelId)
        const course = await this.courseservice.findByOne(input.courseId)
        wrap(personnelsalle).assign({
          salle: salle,
          personnel: personnel,
          course: course
        },
        {
            em: this.em
        })

        await this.personnelsalleRepository.persistAndFlush(personnelsalle)
        return personnelsalle

}

async update(
  id:string,input: PersonnelSalleCreateInput,
): Promise<PersonnelSalle> {  
  const personnelsalle = this.findByOne(id)
  wrap(personnelsalle).assign({
    salle: input.salleId,
    personnel: input.personnelId,
    course: input.courseId
  },
  {
      em: this.em
  })

  await this.personnelsalleRepository.persistAndFlush(personnelsalle)
  return personnelsalle

}

async findall(){
    return await this.personnelsalleRepository.findAll({
      populate:['course','personnel','salle']
    })
}

findByOne(filters: FilterQuery<PersonnelSalle>): Promise<PersonnelSalle | null> {
    return this.personnelsalleRepository.findOne(filters);
  }

findById(id:string){
    return this.personnelsalleRepository.findOne(id)
}

async delete(id:string){
    const a = this.findById(id)
    await this.personnelsalleRepository.nativeDelete(await a)
    if(!a){
    throw Error("not found")
    }
    return a
    }

async findbyCoursePersonnelSalle(salleId:string, personnelId: string, courseId: string){
  const a=(await this.em.find(PersonnelSalle,{salle: salleId, personnel:personnelId, course:courseId})).map(async a=>(await a.personnel.load()).firstName)
  const b = (await this.em.find(PersonnelSalle,{salle: salleId, personnel:personnelId, course:courseId})).map(async a=>((await a.course.load()).title))
  const c= (await this.em.find(PersonnelSalle,{salle: salleId, personnel:personnelId, course:courseId})).map(async a=>((await a.salle.load()).name))[0]
  return {a, c, b}
  
}

}