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
        const sectionCycle = new SectionCycle()
        const section = input.section
                ? await this.sectionService.findByOne({id:input.section_id})
                : await this.sectionService.create(input.section)
        
        const cycle = input.cycle
                ? await this.cycle.findByOne({id:input.cycle_id})
                : await this.cycle.create(input.cycle)

        wrap(sectionCycle).assign(
          {
          description: input.description,
          section: section.id,
          cycle: cycle.id
          },
          {
            em: this.em
          }
        );

        await this.sectionCycleRepository.persistAndFlush(sectionCycle)
        return sectionCycle
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
            input.cycle_id && (await this.cycle.findByOne({id:input.cycle_id}));
      
            if (!cycle) {
              throw new NotFoundError('prime no exist' || '');
            }
            this.cycle.update(cycle.id, input.cycle);   
        }

        if(input.section){
            const section =
            input.section_id && (await this.sectionService.findByOne({id:input.section_id}));
      
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
      const sectionCycle = await this.sectionCycleRepository.findOneOrFail(id)
      let montantAttendu = 0
      let montantRecu = 0
      const section  = sectionCycle.niveau
      for(let i =0; i < section.length; i++){
        for(let j = 0; j < section[i].salle.length; j++ ){
          montantAttendu += section[i].salle[j].effectif*(await section[i].salle[j].fraisInscription.load()).montant
          const listeInscription = (await section[i].salle[j].fraisInscription.load()).inscription
          for (let k = 0 ; k < listeInscription.length; k++){
              montantRecu += listeInscription[k].montant
          }
        }
      }

      return {
            "sectionCycle": sectionCycle,
            "montantAttendu" : montantAttendu,
            "montantRecu": montantRecu,
            "RAR": montantAttendu - montantRecu,
            "TRAR": ((montantAttendu - montantRecu)/montantAttendu)*100
      }

    } 
}