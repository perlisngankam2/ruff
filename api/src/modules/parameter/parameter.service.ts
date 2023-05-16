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
import { Parameter } from 'src/entities/parameter.entity';
import { AnneeAccademiqueService } from '../anne_accademique/anne-accademique.service';
import { ParameterCreateInput } from './dto/parameter.input';
import { ParameterUpdateInput } from './dto/parameter.update';
// import { AnneeAccademique } from 'src/entities/annee-accademique.entity';


@Entity()
@ObjectType()
export class ParameterService {
    constructor(
        @InjectRepository(Parameter)
        private parameterRepository: EntityRepository<Parameter>,
        // private academicservice: AnneeAccademiqueService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: ParameterCreateInput,
      ): Promise<Parameter> {        
        const parameter = new Parameter()
        wrap(parameter).assign({
            year: input.year,
            name: input.name,
            contry: input.contry,
            phoneNumber: input.phoneNumber,
            postalBox: input.postalBox,
            emailAddress: input.emailAddress,
            schoolCurrency: input.schoolCurrency,
            anneeacademique: input.anneeAcademiqueId

        },
          {
            em:this.em
          },
        )

        await this.parameterRepository.persistAndFlush(parameter)
        return parameter
      }
    


      findOne(filters: FilterQuery<Parameter>): Promise<Parameter | null> {
        return this.parameterRepository.findOne(filters);
      }

      async saveParameter(year:string): Promise<Parameter | null> {
        const paramter = new Parameter()
        wrap(paramter).assign(
            {
              year: year,
              // name: input.name,
              // contry: input.contry,
              // phoneNumber: input.phoneNumber,
              // postalBox: input.postalBox,
              // emailAddress: input.emailAddress
            },
            {
                em: this.em
            }
        )

        await this.parameterRepository.persistAndFlush(paramter)
        return paramter
      }

      findById(id:string){
        return this.parameterRepository.findOne(id)
      }
    
      getAll(): Promise<Parameter[]> {
        return this.parameterRepository.findAll({
          populate:['anneeacademique']
        })
      }
      
      async update(id:string, input:ParameterUpdateInput): Promise<Parameter> {
        const parameter =await this.findById(id)
        wrap(parameter).assign({
           year: input.year,
           name: input.name,
           contry: input.contry,
           phoneNumber: input.phoneNumber,
           postalBox: input.postalBox,
           emailAddress: input.emailAddress
        },
            { em: this.em },
    );
        await this.parameterRepository.persistAndFlush(parameter);
        return parameter;
      }

      async updatesaveParameter(input:string){
        const parameter= await this.getAll()
        parameter.forEach((parameter) => {
            parameter.year= input;
            this.parameterRepository.persist(parameter);
          });
          
          await this.parameterRepository.flush();
      }

      async delete(id:string){
        const a = this.findById(id)
        await this.parameterRepository.nativeDelete(await a)
        if(!a){
        throw Error("not found")
        }
        return a
      }   
}