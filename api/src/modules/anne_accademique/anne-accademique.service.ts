/* eslint-disable prettier/prettier */
import { EntityManager, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { EntityRepository} from '@mikro-orm/postgresql';
import { AnneeAccademique } from 'src/entities/annee-accademique.entity';
import { AnneeAccademiqueCreateInput } from './dto/anne-accademique.update';
import { AnneeAccademiqueUpdateInput } from './dto/anne-accadmique.input';
import { ParameterService } from '../parameter/parameter.service';
import { ParameterCreateInput } from '../parameter/dto/parameter.input';
import { TrancheStudentService } from '../tranche-student/tranche-student.service';
import { TrancheService } from '../tranche/tranche.service';
import { PensionService } from '../pension/pension.service';


@Injectable()
export class AnneeAccademiqueService {
  constructor(
    @InjectRepository(AnneeAccademique)
    private readonly anneAccademiquePrimeRepository : EntityRepository<AnneeAccademique>,
    private parameterservice: ParameterService,
    private readonly em: EntityManager,
    // private tranchestudentservice: TrancheStudentService,
    // private trancheservice: TrancheService,
    // private pensionService: PensionService
  ) {}


   async findByOne(filters: FilterQuery<AnneeAccademique>): Promise<AnneeAccademique | null> {
     return await this.anneAccademiquePrimeRepository.findOne(filters);
    }

  async findById(id:string){
    return await this.anneAccademiquePrimeRepository.findOne(id)
  }

  async create(
    input:AnneeAccademiqueCreateInput,
  ): Promise<AnneeAccademique> {

    const annee = new AnneeAccademique()  
    wrap(annee).assign(
      {
        name: input.name,
        description: input.description
      },
      {
        em: this.em,
      },
    );

    const a = await this.getAll()
    const year = a[a.length-1].name
    await this.anneAccademiquePrimeRepository.persistAndFlush(annee)
    await this.parameterservice.saveParameter(year)
    return annee
  }


  getAll(): Promise<AnneeAccademique[]> {
    return this.anneAccademiquePrimeRepository.findAll()
  }
  
  async update(id:string, input: AnneeAccademiqueUpdateInput): Promise<AnneeAccademique> {
    const annee = await this.findById(id)
    wrap(annee).assign({
      name: input.name || annee.name,
      description: input.description || annee.description,
      // anneeAccademique: input.anneeAccademique || annee.anneeAccademique
    },
    {
      em: this.em,
    },
    );

    await this.parameterservice.updatesaveParameter(input.name)
    await this.anneAccademiquePrimeRepository.persistAndFlush(annee);

    return annee;
  }

  async delete(localid:string): Promise<AnneeAccademique>{
   const a = this.findById(localid)
   await this.anneAccademiquePrimeRepository.removeAndFlush(a);
   if(!a){
    throw console.error("not found");
   }
   return a
  }

}