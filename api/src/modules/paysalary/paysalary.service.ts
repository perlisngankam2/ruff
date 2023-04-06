/* eslint-disable prettier/prettier */
import { EntityManager, FilterQuery, NotFoundError, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CategoriePersonnel } from 'src/entities/categorie-personnel.entity';
import { SalaireBaseService } from '../salaire_base/salaire-base.service';
import { RetenuService } from '../retenu_salarial/retenu.service';
import { PrimeService } from '../prime/prime.service';
import { Salaire } from 'src/entities/salaire.entity';
import { RetenuPersonnelService } from '../retenu_personnel/retenu-personnel.service';
import { PrimePersonnelService } from '../prime_personnel/prime-personnel.service';

import { PersonnelService } from '../personnel/personnel.service';
import { PeriodeService } from '../periode/periode.service';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Personnel, Status } from 'src/entities/pesonnel.entity';
import { CategoriePersonnelUpdate } from '../categorie_personnel/dto/categorie-personnel.update';

import { PaySalaire } from 'src/entities/pay_salary.entity';
import { PaySalaireCreateInput } from './dto/paysalary.create';
import { PaySalaireUpdateInput } from './dto/paysalary.update';

@Injectable()
export class PaySalaireService {
  constructor(
    @InjectRepository(Salaire)
    private paysalaireRepository: EntityRepository<PaySalaire>,
    // private salaireBaseeService: SalaireBaseService,
    private retenuPersonnel : RetenuPersonnelService,
    private   Primeservice: PrimeService,
    private periodeService: PeriodeService,
    private primepersonnelservice: PrimePersonnelService,
    private personnel : PersonnelService,
    private readonly em: EntityManager,
  ) {}

  async create(
    input: PaySalaireCreateInput,
  ): Promise<PaySalaire> {

    const personnel = await this.personnel.findOne(input.personnelId)
    const paysalaire = new PaySalaire()
  

    if(personnel){
      if((await this.getAll()).map(a=>a.personnel).filter(async a=>(await a.load()).id === personnel.id).length > 1){
        throw Error("!!!!!!!!!!! CE PERSONNEL A DEJA ETE PAYER !!!!!!!!!!!!")
      }
    

      

      if(personnel.status == Status.PERMANENT){

      
            // const salaireNette = salaireBase 

      wrap(paysalaire).assign(
        {
         montant: Number(input.montant),
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

      this.paysalaireRepository.persistAndFlush(paysalaire)
      return paysalaire

      }

      if(personnel.status == Status.VACATAIRE){
      wrap(paysalaire).assign(
        {
        montant: Number(input.montant),
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
      this.paysalaireRepository.persistAndFlush(paysalaire)
      return paysalaire
      }

    }
  



   
}

  findByOne(filters: FilterQuery<PaySalaire>): Promise<PaySalaire | null> {
    return this.paysalaireRepository.findOne(filters);
  }

  findById(id:string){
    return this.paysalaireRepository.findOne(id)
  }

  getAll(): Promise<Salaire[]> {
    return this.paysalaireRepository.findAll()
  }


  
 async update(id:string, input: PaySalaireUpdateInput): Promise<PaySalaire> {
     
  const personnel = await this.personnel.findOne(input.personnelId)

//   const periode = await this.periodeService.findByOne(input.periodeId) 
  
  const salaire = await this.findByOne(id)

  wrap(salaire).assign(
    {
      montant: input.montant,
      // payer: input.payer,
      personnel: personnel.id,
    //   periode: periode.id
    },
    {
      em: this.em
    }
  )
    
  await this.paysalaireRepository.persistAndFlush(salaire);

return salaire;
   }

   
  async delete(id:string){
    const a= this.findById(id)
    await this.paysalaireRepository.removeAndFlush(a)
    if(!a){
     throw Error("not found")
    }
    return a
 }

 async salairepersonnel(personnelid:string){
  const a = this.paysalaireRepository.find({personnel:personnelid})
  return a
  
}

}