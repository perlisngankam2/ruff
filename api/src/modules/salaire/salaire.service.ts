/* eslint-disable prettier/prettier */
import { EntityManager, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { SalaireCreateInput } from './dto/salaire.input';
import { PersonnelService } from '../personnel/personnel.service';
import { EntityRepository } from '@mikro-orm/postgresql';
import {  Status } from 'src/entities/pesonnel.entity';
import { SalaireUpdateInput } from './dto/salaire.update';
import { Salaire } from 'src/entities/salaire.entity';
import { ExpenseService } from '../expenses/expense.service';
import { PaySalaryService } from '../paysalary/paysalary.service';
import { error } from 'console';

@Injectable()
export class SalaireService {
  constructor(
    @InjectRepository(Salaire)
    private salaireRepository: EntityRepository<Salaire>,
    private personnel : PersonnelService,
    private paysalaryservice: PaySalaryService,
    private readonly em: EntityManager,
    @Inject(forwardRef(() => ExpenseService))
    private expenseservice:ExpenseService,
  ) {}

  async create(
    input: SalaireCreateInput,
  ): Promise<Salaire> {

     const personnel = await this.personnel.findOne(input.personnelId)
     const salaire= new Salaire()
   

    if(personnel){

      const allPaySalary = await this.paysalaryservice.getAll()
      const paysalary = allPaySalary.filter(async a=>(await a.personnel.load()).id==personnel.id).filter(a=>a.moisPaie==input.moisPaie)[0]

      if(!paysalary){
        throw error("!!!!!!!!!!!!!!!IL N'EXISTE AUCUN PAIEMENT FAIT POUR CE PERSONNEL!!!!!!!!!!!!!!!!")
      }
      const salaireNette = paysalary.montant

      if((await this.getAll()).filter(async a=>a.personnel.id === personnel.id).filter(a=>a.moisPaie==input.moisPaie).length>1){
        throw Error("!!!!!!!!!!! LE PAIEMENT DE CE PERSONNEL A DEJA ETE ENREGISTRER POUR CE MOIS !!!!!!!!!!!!")
      }
      const salaireBase = (await personnel.category.load()).montant
      
     
      if(personnel.status == Status.PERMANENT){

      wrap(salaire).assign(
        {
         montant: Number(salaireNette),
         payer: input.payer,
         personnel: input.personnelId,
         jourPaie: input.jourPaie,
         moisPaie: input.moisPaie
        },
        {
        em: this.em
        }
      )

      await this.salaireRepository.persistAndFlush(salaire)
      await this.expenseservice.saveSalaireExpenses(personnel.id)
      return salaire
    

      }

      if(personnel.status == Status.VACATAIRE){
      wrap(salaire).assign(
        {
        montant: Number(salaireBase),
        payer: input.payer,
        personnel: personnel.id,
        jourPaie: input.jourPaie,
        moisPaie: input.moisPaie
        },
        {
          em: this.em
        }
      )
      await this.salaireRepository.persistAndFlush(salaire)
      await this.expenseservice.saveSalaireExpenses(personnel.id)
      return salaire
     
      }

    

  }

}

  findByOne(filters: FilterQuery<Salaire>): Promise<Salaire | null> {
    return this.salaireRepository.findOne(filters);
  }

  findById(id:string){
    return this.salaireRepository.findOne(id,{
      populate:['personnel']
    })
  }

  getAll(): Promise<Salaire[]> {
    return this.salaireRepository.findAll()
  }


  
 async update(id:string, input: SalaireUpdateInput): Promise<Salaire> {
     
  const personnel = await this.personnel.findOne(input.personnelId)

//   const periode = await this.periodeService.findByOne(input.periodeId) 
  
  const salaire = await this.findByOne(id)

  wrap(salaire).assign(
    {
      montant: input.montant,
      payer: input.payer,
      personnel: personnel.id,
    //   periode: periode.id
    },
    {
      em: this.em
    }
  )
    

    return salaire;
   }

  async delete(id:string){
    const a= this.findById(id)
    await this.salaireRepository.removeAndFlush(a)
    if(!a){
     throw Error("not found")
    }
    return a
  }

 async salairepersonnel(personnelid:string){
  const a = this.salaireRepository.find({personnel:personnelid})
  if((await a).length==0){
    throw Error("THIS PERSONNEL HAS NOT YET BEING PAIED PLEASE ENTER A VALID PERSONNEL")
  }
  return a
  
}

async personnelMonthSalary(personnelId:string){
  const b = (await this.salairepersonnel(personnelId)).map(a=>a.moisPaie)
  return b
}

async personnelNetSalary(personnelId:string){
  const b = (await this.salairepersonnel(personnelId)).map(a=>a.montant)
  return b
}

async personnelsalairenetbymonth(personnelid:string, month:string){
  const a= (await this.salairepersonnel(personnelid)).filter(a=>a.moisPaie==month)[0].montant
  if(a==0){
   throw Error("!!!!!!!!!!!!!!!!!!!!No net salary for this month!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  }
  return a
}

}