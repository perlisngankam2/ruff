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
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SectionCycle } from 'src/entities/section-cycle.entity';
import { CycleService } from '../cycle/cycle.service';
import { SectionService } from '../section/section.service';
import { SectionCycleCreateInput } from './dto/section-cycle.input';
import { SectionCycleUpdateInput } from './dto/section-cycle.update';

@Entity()
@ObjectType()
export class SectionCycleService {
    constructor(
        @InjectRepository(SectionCycle)
        private sectionCycleRepository: EntityRepository<SectionCycle>,
        private sectionService: SectionService,
        private cycle: CycleService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: SectionCycleCreateInput,
      ): Promise<SectionCycle> {        
        const cycle = this.cycle.findById(input.cycle)
        if(!cycle){
          throw Error("cycly not found")
        }

        const section = this.sectionService.findById(input.section)
        if(!section){
          throw Error("section not found")
        }

        const sectioncycle = new SectionCycle()

        wrap(sectioncycle).assign({
          cycle : input.cycle,
          section : input.section
        },
        {
          em: this.em,
        });
        await this.sectionCycleRepository.persistAndFlush(sectioncycle)
        return sectioncycle

      }
    
      findByOne(filters: FilterQuery<SectionCycle>): Promise<SectionCycle | null> {
        return this.sectionCycleRepository.findOne(filters);
      }
      findById(id:string){
        return this.sectionCycleRepository.findOne(id)
      }
    
      getAll(): Promise<SectionCycle[]> {
        return this.sectionCycleRepository.findAll()
      }
      
      async update(id:string, input: SectionCycleUpdateInput): Promise<SectionCycle> {
        const sectionCycle = await this.findById(id)
        if(input.cycle){
            const cycle =
            input.cycle?.ID &&
              (await this.cycle.findById(input.cycle?.ID));
      
            if (!cycle) {
              throw new NotFoundError('prime no exist' || '');
            }
            this.cycle.update(cycle.id, input.cycle);   
        }

        if(input.section){
            const section =
            input.section?.ID &&
              (await this.sectionService.findByOne({id:input.section?.ID}));
      
            if (!section) {
              throw new NotFoundError('prime no exist' || '');
            }
            this.cycle.update(section.id, input.section); 
        }
        wrap(sectionCycle).assign({
            description: input.description || sectionCycle.description
        },
        { em: this.em },
    );
        await this.sectionCycleRepository.persistAndFlush(sectionCycle);
        return sectionCycle;
      }
    async delete(id:string){
    const a=this.findById(id)
    await this.sectionCycleRepository.removeAndFlush(a)
    if(!a){
    throw Error("not found")
    }
    return a
        
    }   

    async EtatInscriptionSection(id:string){
    //   const section  = sectionCycle.cycle
    //   for(leconst sectionCycle = await this.sectionCycleRepository.findOneOrFail(id)
    //   let montantAttendu = 0
    //   let montantRecu = 0
    //   t i =0; i < section.length; i++){
    //     for(let j = 0; j < section[i].salle.length; j++ ){
    //       montantAttendu += section[i].salle[j].effectif*section[i].salle[j].fraisInscription.getEntity().montant
    //       const listeInscription = section[i].salle[j].fraisInscription.getEntity().inscription
    //       for (let k = 0 ; k < listeInscription.length; k++){
    //           montantRecu += listeInscription[k].montant
    //       }
    //     }
    //   }

    //   return {
    //         "sectionCycle": sectionCycle,
    //         "montantAttendu" : montantAttendu,
    //         "montantRecu": montantRecu,
    //         "RAR": montantAttendu - montantRecu,
    //         "TRAR": ((montantAttendu - montantRecu)/montantAttendu)*100
    //   }

  } 

}