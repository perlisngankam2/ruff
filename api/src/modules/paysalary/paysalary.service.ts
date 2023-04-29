/* eslint-disable prettier/prettier */
import { EntityManager, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { RetenuPersonnelService } from '../retenu_personnel/retenu-personnel.service';
import { PrimePersonnelService } from '../prime_personnel/prime-personnel.service';

import { PersonnelService } from '../personnel/personnel.service';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Status } from 'src/entities/pesonnel.entity';
import { PaySalary } from 'src/entities/paysalary.entity';
import { PaySalaryCreateInput } from './dto/paysalary.create';
import { PaySalaryUpdateInput } from './dto/paysalary.update';

@Injectable()
export class PaySalaryService {
  constructor(
    @InjectRepository(PaySalary)
    private paysalaryRepository: EntityRepository<PaySalary>,
    private retenuPersonnel : RetenuPersonnelService,
    private primepersonnelservice: PrimePersonnelService,
    private personnel : PersonnelService,
    private readonly em: EntityManager,
  ) {}

  async create(
    input: PaySalaryCreateInput,
  ): Promise<PaySalary> {

    const personnel = await this.personnel.findOne(input.personnelId)

    const paysalaire= new PaySalary()
    const retenus =await this.retenuPersonnel.getallretenupersonnelbymonth(personnel.id,input.moisPaie)
    console.log(retenus)
    const primes = await this.primepersonnelservice.getallpersonnelprimebymonth(personnel.id,input.moisPaie)
    console.log(primes)


    if(personnel){
      if((await this.getAll()).filter(async a=>a.personnel.id === personnel.id).filter(a=>a.moisPaie==input.moisPaie).length>1){
        throw Error("!!!!!!!!!!! CE PERSONNEL A DEJA ETE PAYER POUR CE MOIS !!!!!!!!!!!!")
      }
      const salaireBase = (await personnel.category.load()).montant
      
     
      if(personnel.status == Status.PERMANENT){

      const salaireNette = salaireBase + primes - retenus
            // const salaireNette = salaireBase 

      wrap(paysalaire).assign(
        {
         montant: Number(salaireNette),
         personnel: input.personnelId,
         moisPaie: input.moisPaie

        //  periode: input.periodeId
        },
        {
        em: this.em
        }
      )

      await this.paysalaryRepository.persistAndFlush(paysalaire)
      return paysalaire
    

      }

      if(personnel.status == Status.VACATAIRE){
      wrap(paysalaire).assign(
        {
        montant: Number(salaireBase),
        personnel: personnel.id,
        moisPaie: input.moisPaie
        },
        {
          em: this.em
        }
      )
      await this.paysalaryRepository.persistAndFlush(paysalaire)
      return paysalaire
     
      }

    

  }

}

  findByOne(filters: FilterQuery<PaySalary>): Promise<PaySalary | null> {
    return this.paysalaryRepository.findOne(filters);
  }

  findById(id:string){
    return this.paysalaryRepository.findOne(id)
  }

  getAll(): Promise<PaySalary[]> {
    return this.paysalaryRepository.findAll()
  }


  
 async update(id:string, input: PaySalaryUpdateInput): Promise<PaySalary> {
     
  const personnel = await this.personnel.findOne(input.personnelId)
  
  const paysalaire = await this.findByOne(id)

  wrap(paysalaire).assign(
    {
      montant: input.montant,
      moisPaie: input.moisPaie,
      personnel: personnel.id,
    },
    {
      em: this.em
    }
  )
    
  await this.paysalaryRepository.persistAndFlush(paysalaire);

return paysalaire;
   }

   
  async delete(id:string){
    const a= this.findById(id)
    await this.paysalaryRepository.nativeDelete(await a)
    if(!a){
     throw Error("not found")
    }
    return a
 }

 async salairepersonnel(personnelid:string){
  const a = this.paysalaryRepository.find({personnel:personnelid})
  return a
  
}

async personnelMonthSalary(personnelId:string){
  const b = (await this.salairepersonnel(personnelId)).map(a=>a.moisPaie)
  return b
}

}