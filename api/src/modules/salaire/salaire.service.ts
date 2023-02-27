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
    private salaireBaseeService: SalaireBaseService,
    private retenuPersonnel : RetenuPersonnelService,
    private primePersonnel: PrimePersonnelService,
    private periodeService: PeriodeService,
    private personnel : PersonnelService,
    private readonly em: EntityManager,
  ) {}

  async create(
    input: SalaireCreateInput,
  ): Promise<Salaire> {

    const personnel = await this.personnel.findOne(input.personnelId)
    
    const periode = await this.periodeService.findByOne(input.periodeId)
    // check categorie prime
    const categorie = personnel.category.load()

    const salaireBase = Number((await (await categorie).salaireBase.load()).montant)
   
    const retenus = this.retenuPersonnel.getallretenupersonnel(input.personnelId)

    const primes = this.primePersonnel.getallpersonnelprime(input.personnelId)
  

    const salaire = new Salaire()

    if(personnel.status == Status.PERMANENT){
      let sommePrime = 0
      for(let i = 0; i < (await primes).length; i++){
        sommePrime += Number((await primes[i]).montant)
      }

      let sommeRetenus = 0
      for(let j = 0; j < (await retenus).length; j++){
        sommeRetenus += Number((await retenus[j]).montant)
      }
      const salaireNette = salaireBase + sommePrime - sommeRetenus



      wrap(salaire).assign(
        {
         montant: Number(salaireNette),
         payer: input.payer,
         personnel: input.personnelId,
         periode: input.periodeId
        },
        {
        em: this.em
        }
      )
  
      if(input.payer == true){
          this.salaireRepository.persistAndFlush(salaire)
      }
      throw new Error('confirm payement')
    }
    if(personnel.status == Status.NON_PERMANENT){
      wrap(salaire).assign(
        {
        montant: Number(salaireBase),
        payer: input.payer,
        personnel: personnel.id,
        periode: periode.id
        },
        {
          em: this.em
        }
      )
      if(input.payer==false){
        this.salaireRepository.persistAndFlush(salaire)
      }
      throw console.error('salarie a ete payer');
      

    }
  return salaire
 
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

  const periode = await this.periodeService.findByOne(input.periodeId) 
  
  const salaire = await this.findByOne(id)

  wrap(salaire).assign(
    {
      montant: input.montant,
      payer: input.payer,
      personnel: personnel.id,
      periode: periode.id
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