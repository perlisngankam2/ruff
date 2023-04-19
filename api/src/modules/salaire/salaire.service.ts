/* eslint-disable prettier/prettier */
import { EntityManager, FilterQuery, NotFoundError, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { PrimeService } from '../prime/prime.service';
import { RetenuPersonnelService } from '../retenu_personnel/retenu-personnel.service';
import { PrimePersonnelService } from '../prime_personnel/prime-personnel.service';
import { SalaireCreateInput } from './dto/salaire.input';
import { PersonnelService } from '../personnel/personnel.service';
import { PeriodeService } from '../periode/periode.service';
import { EntityRepository } from '@mikro-orm/postgresql';
import {  Status } from 'src/entities/pesonnel.entity';
import { SalaireUpdateInput } from './dto/salaire.update';
import { Salaire } from 'src/entities/salaire.entity';

@Injectable()
export class SalaireService {
  constructor(
    @InjectRepository(Salaire)
    private salaireRepository: EntityRepository<Salaire>,
    // private salaireBaseeService: SalaireBaseService,
    private retenuPersonnel : RetenuPersonnelService,
    private primepersonnelservice: PrimePersonnelService,
    private personnel : PersonnelService,
    private readonly em: EntityManager,
  ) {}

  async create(
    input: SalaireCreateInput,
  ): Promise<Salaire> {

    const personnel = await this.personnel.findOne(input.personnelId)
    
    // const periode = await this.periodeService.findByOne(input.periodeId)
    // // check categorie prime
    //const categorie = personnel.category.load()

    const salaire= new Salaire()
    const retenus =await this.retenuPersonnel.getallretenupersonnelbymonth(personnel.id,input.moisPaie)
    console.log(retenus)
    const primes = await this.primepersonnelservice.getallpersonnelprimebymonth(personnel.id,input.moisPaie)
    console.log(primes)
    //ici j'ai tous les mois auquels les primes ont ete attribuer au personnel
    const moisprimespersonnel = (await this.primepersonnelservice.getallprimespersonnel(personnel.id)).filter(a=>a.startMonth==input.moisPaie)



    if(personnel){
      if((await this.getAll()).filter(async a=>a.personnel.id === personnel.id).filter(a=>a.moisPaie==input.moisPaie).length>1){
        throw Error("!!!!!!!!!!! CE PERSONNEL A DEJA ETE PAYER POUR CE MOIS !!!!!!!!!!!!")
      }
      const salaireBase = (await personnel.category.load()).montant
      
      if(moisprimespersonnel.length!=0)
      {
      if(personnel.status == Status.PERMANENT){

      const salaireNette = salaireBase + primes - retenus
            // const salaireNette = salaireBase 

      wrap(salaire).assign(
        {
         montant: Number(salaireNette),
         payer: input.payer,
         personnel: input.personnelId,
         jourPaie: input.jourPaie,
         moisPaie: input.moisPaie

        //  periode: input.periodeId
        },
        {
        em: this.em
        }
      )

      await this.salaireRepository.persistAndFlush(salaire)
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
        // periode: periode.id
        },
        {
          em: this.em
        }
      )
      await this.salaireRepository.persistAndFlush(salaire)
      return salaire
     
      }

    }

    if(moisprimespersonnel.length==0){
    throw Error("le mois de paie ne correspond a aucun mois de prime attribuer au personnel")
    }

  }

}

  findByOne(filters: FilterQuery<Salaire>): Promise<Salaire | null> {
    return this.salaireRepository.findOne(filters);
  }

  findById(id:string){
    return this.salaireRepository.findOne(id)
  }

  getAll(): Promise<Salaire[]> {
    return this.salaireRepository.findAll()
  }


  
 async update(id:string, input: SalaireUpdateInput): Promise<Salaire> {
  
     
  const personnel = await this.personnel.findOne(input.personnelId)

// //   const periode = await this.periodeService.findByOne(input.periodeId) 
  
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
    
await this.salaireRepository.persistAndFlush(salaire);
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