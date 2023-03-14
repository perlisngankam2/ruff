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
import { SalaireCreateInput } from './dto/salaire.input';
import { PersonnelService } from '../personnel/personnel.service';
import { PeriodeService } from '../periode/periode.service';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Personnel, Status } from 'src/entities/pesonnel.entity';
import { CategoriePersonnelUpdate } from '../categorie_personnel/dto/categorie-personnel.update';
import { SalaireUpdateInput } from './dto/salaire.update';

@Injectable()
export class SalaireService {
  constructor(
    @InjectRepository(Salaire)
    private salaireRepository: EntityRepository<Salaire>,
    // private salaireBaseeService: SalaireBaseService,
    private retenuPersonnel : RetenuPersonnelService,
    private   Primeservice: PrimeService,
    private periodeService: PeriodeService,
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

   
    const retenus = Number(this.retenuPersonnel.getallretenupersonnel(input.retenuId))||0.0
    const primes = Number(this.primepersonnelservice.getallpersonnelprime(input.primeId))||0.0

    if(personnel){
      if((await this.getAll()).map(a=>a.personnel).filter(async a=>(await a.load()).id === personnel.id).length > 1){
        throw Error("!!!!!!!!!!! CE PERSONNEL A DEJA ETE PAYER !!!!!!!!!!!!")
      }
      const salaireBase = (await (await personnel.category.load()).salaireBase.load()).montant

      const salaire = new Salaire()

      if(personnel.status == Status.PERMANENT){

      const salaireNette = salaireBase + primes - retenus

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

      this.salaireRepository.persistAndFlush(salaire)
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
      this.salaireRepository.persistAndFlush(salaire)
      return salaire
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

}