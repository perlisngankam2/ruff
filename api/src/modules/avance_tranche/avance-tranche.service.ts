/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    EntityManager,
    FilterQuery,
    NotFoundError,
    wrap
  } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {ObjectType } from '@nestjs/graphql';
import { TrancheStudent } from 'src/entities/tranche-student.entity';
import { AvanceTranche } from '../../entities/avance-tranche.entity';
import { StudentService } from '../student/student.service';
import { TrancheStudentService } from '../tranche-student/tranche-student.service';
import { TrancheService } from '../tranche/tranche.service';
import { AvanceTrancheCreateInput } from './dto/avance-tranche.input';
import { AvanceTrancheUpdateInput } from './dto/avance-tranche.update';

@Injectable()
export class AvanceTrancheService {
    constructor(
        @InjectRepository(AvanceTranche)
        private avanceTrancheRepository: EntityRepository<AvanceTranche>,
        @Inject(forwardRef(() => TrancheStudentService))
        private trancheStudentservice: TrancheStudentService,
        private studentservice: StudentService,
        private trancheservice: TrancheService,
        private  em: EntityManager,
      ) {}
    
    async createavancetranche(
        input: AvanceTrancheCreateInput,
      ): Promise<AvanceTranche>|null {  
        const avanceTranche = new AvanceTranche()

        // const studentidlist = (await this.studentservice.getAll()).map(a=>a.id)

       // const inputstudentid = await this.studentservice.findByOne(input.tranchestudentinput.studentId)
        

        const tranchestudent = await this.trancheStudentservice.findByStudent(input.tranchestudentinput.studentId)
       
        console.log('student id ---->', input.tranchestudentinput.studentId )
        console.log('tranchestudent------->',tranchestudent)
        // const tranchestudent = (await this.trancheStudentservice.getAll()).filter(async a=> (await a.student.load()).id === inputstudentid.id)[0]    

        const tranche = await this.trancheservice.findByOne(input.trancheId)

        if(!tranche){
          throw Error("tranche not found")
        }


        if(tranchestudent==null)  {
           
           
          const tranchestudents= this.trancheStudentservice.create(input.tranchestudentinput) 
          console.log("========>"+tranchestudents)
          const student = (await tranchestudents).student.load()
          const reduction = (await (await student).categorie.load()).reductionScolarite.load()
          const fraistranche = tranche.montant


        wrap(avanceTranche).assign({
          montant: Number(input.montant),
          name: input.name,
          description: input.description,
          trancheStudent:(await tranchestudents).id,
          tranche: input.trancheId
          
        },
        {
          em:this.em
        })

        // if((await reduction).pourcentage != 0){
        //   const newValue = (await tranche.tranche.load()).montant - (await tranche.tranche.load()).montant*(await reduction).pourcentage
        //   avanceTranche.reste = newValue - tranche.montant
        //   if(avanceTranche.reste == 0){
        //       avanceTranche.complete = true
        //   }
        // }

        // if((await reduction).montant != 0){
        //   const newValue = (await tranche.tranche.load()).montant - (await reduction).montant
        //   avanceTranche.reste = newValue - tranche.montant
        //   if(avanceTranche.reste == 0){
        //     avanceTranche.complete = true
        //   }
        // }
        if ((await this.em.find(AvanceTranche,{trancheStudent: (await tranchestudents).id})).map(a=>a.montant).length>=1) {
          const totalamount= Number((await this.em.find(AvanceTranche,{trancheStudent: (await tranchestudents).id})).map(a=>a.montant).reduce(function(a,b){return a+b}))
        
          if(totalamount == tranche.montant){
            throw Error("!!!!!!VOUS NE POUVEZ PLUS FAIRE DES AVANCES CAR LA SOMME DE LA PENSION A ETE ATTEINTE!!!!!!!!!!!!")
          }
        }

        if((await reduction).pourcentage != 0){
          const newValue = (await tranchestudent.tranche.load()).montant - (await tranchestudent.tranche.load()).montant*(await reduction).pourcentage
           if(input.montant < newValue){
               // create the avance tranche
              wrap(avanceTranche).assign({
              montant: Number(input.montant),
              name: input.name,
              description: input.description,
              trancheStudent: (await tranchestudents).id,
              tranche:tranche.id,
              complete: false
              },
              {
                em:this.em
              })
              this.trancheStudentservice.saveTranche(tranchestudent.id)
              this.avanceTrancheRepository.persistAndFlush(avanceTranche)
              return avanceTranche
              // console.log('===========>'+inscript)   
           }
          //  tranchestudent.complete = true
           avanceTranche.complete=true
           this.trancheStudentservice.saveTranche(tranche.id)
           this.avanceTrancheRepository.persistAndFlush(avanceTranche)
           return avanceTranche
        }

        if((await reduction).montant!= 0){
          const newValue = tranche.montant - tranche.montant*(await reduction).pourcentage
           if(input.montant < newValue){
               // create the avance tranche
              wrap(avanceTranche).assign({
              montant: Number(input.montant),
              name: input.name,
              description: input.description,
              trancheStudent:(await tranchestudents).id,
              tranche: tranche.id,
              complete: false
              },
              {
                em:this.em
              })
              this.trancheStudentservice.saveTranche(tranchestudent.id)
              this.avanceTrancheRepository.persistAndFlush(avanceTranche)
              return avanceTranche
              // console.log('===========>'+inscript)   
           }

       
          //  tranchestudent.complete = true
           avanceTranche.complete=true
           this.trancheStudentservice.saveTranche(tranchestudent.id)
           this.avanceTrancheRepository.persistAndFlush(avanceTranche)
           return avanceTranche
        }

        if(input.montant < fraistranche){
          // create avance inscription
          wrap(avanceTranche).assign({
           montant: Number(input.montant)||0.0,
           name: input.name,
           description: input.description,
           trancheStudent: (await tranchestudents).id,
           tranche: tranche.id,
           complete: false
           },
           {
             em:this.em
           })

           // ici je dois verifier si l'accumulation de toutes les montants des avances d'une inscription
           this.trancheStudentservice.saveTranche((await tranchestudents).id)
           this.avanceTrancheRepository.persistAndFlush(avanceTranche)
           return avanceTranche
         
      }
          

        // tranchestudent.complete = true
        avanceTranche.complete = true
        this.trancheStudentservice.saveTranche(tranchestudent.id)
        this.avanceTrancheRepository.persistAndFlush(avanceTranche)
        return avanceTranche
     }



     ///!!!!!!!!!!!!!!!  SI L'INSCRIPTION EXISTE EST CORRECT !!!!!!!

     if(tranchestudent)  
     {
      // throw Error("tranchestudent not found")
     const student = (tranchestudent).student.load()

    //  const reduction = (await (await student).categorie.load()).reductionScolarite.load()
   
  
   const fraistranche = tranche.montant


   wrap(avanceTranche).assign({
     montant: Number(input.montant),
     name: input.name,
     description: input.description,
     trancheStudent: tranchestudent.id,
     tranche: input.trancheId
     
   },
   {
     em:this.em
   })

 
   if ((await this.em.find(AvanceTranche,{trancheStudent: tranchestudent.id})).map(a=>a.montant).length>=1) {
    const totalamount= Number((await this.em.find(AvanceTranche,{trancheStudent: tranchestudent.id})).map(a=>a.montant).reduce(function(a,b){return a+b}))
  
    if(totalamount == tranche.montant){
      throw Error("!!!!!!VOUS NE POUVEZ PLUS FAIRE DES AVANCES CAR LA SOMME DE LA PENSION A ETE ATTEINTE!!!!!!!!!!!!")
    }
  }

  //  if((await reduction).pourcentage != 0){
  //    const newValue = (await tranchestudent.tranche.load()).montant - (await tranchestudent.tranche.load()).montant*(await reduction).pourcentage
  //     if(input.montant < newValue){
  //         // create the avance tranche
  //        wrap(avanceTranche).assign({
  //        montant: Number(input.montant),
  //        name: input.name,
  //        description: input.description,
  //        trancheStudent: tranchestudent.id,
  //        tranche:tranche.id,
  //        complete: false
  //        },
  //        {
  //          em:this.em
  //        })
  //        this.trancheStudentservice.saveTranche(tranchestudent.id)
  //        this.avanceTrancheRepository.persistAndFlush(avanceTranche)
  //        return avanceTranche
  //        // console.log('===========>'+inscript)   
  //     }
  //     tranchestudent.complete = true
  //     avanceTranche.complete=true
  //     this.trancheStudentservice.saveTranche(tranche.id)
  //     this.avanceTrancheRepository.persistAndFlush(avanceTranche)
  //     return avanceTranche
  //  }

  //  if((await reduction).montant!= 0){
  //    const newValue = tranche.montant - tranche.montant*(await reduction).pourcentage
  //     if(input.montant < newValue){
  //         // create the avance tranche
  //        wrap(avanceTranche).assign({
  //        montant: Number(input.montant),
  //        name: input.name,
  //        description: input.description,
  //        trancheStudent: tranchestudent.id,
  //        tranche: tranche.id,
  //        complete: false
  //        },
  //        {
  //          em:this.em
  //        })
  //        this.trancheStudentservice.saveTranche(tranchestudent.id)
  //        this.avanceTrancheRepository.persistAndFlush(avanceTranche)
  //        return avanceTranche
  //        // console.log('===========>'+inscript)   
  //     }
  
  //     tranchestudent.complete = true
  //     avanceTranche.complete=true
  //     this.trancheStudentservice.saveTranche(tranchestudent.id)
  //     this.avanceTrancheRepository.persistAndFlush(avanceTranche)
  //     return avanceTranche
  //  }

   if(input.montant < fraistranche){
    // create avance inscription
    wrap(avanceTranche).assign({
     montant: Number(input.montant)||0.0,
     name: input.name,
     description: input.description,
     trancheStudent: tranchestudent.id,
     tranche: tranche.id,
     complete: false
     },
     {
       em:this.em
     })

     // ici je dois verifier si l'accumulation de toutes les montants des avances d'une inscription
     this.trancheStudentservice.saveTranche(tranchestudent.id)
     this.avanceTrancheRepository.persistAndFlush(avanceTranche)
     return avanceTranche
   
}
     

   tranchestudent.complete = true
   this.trancheStudentservice.saveTranche(tranchestudent.id)
   this.avanceTrancheRepository.persistAndFlush(avanceTranche)
   return avanceTranche
}

return avanceTranche
      
}


    async saveAvanceTranche(id:string,new_tranche_amount:number){
      const tranche = await this.trancheStudentservice.findById(id)


        const avance = new AvanceTranche()


        wrap(avance).assign({
          name: tranche.name,
          description: tranche.description,
          createdAt: tranche.createdAt,
          montant:tranche.montant,
          reste: new_tranche_amount - tranche.montant
        },
        {
          em: this.em,
        },
        );
    
        await this.avanceTrancheRepository.persistAndFlush(avance);
    
        return avance
    };
    
    findByOneavancetranche(filters: FilterQuery<AvanceTranche>): Promise<AvanceTranche | null> {
        return this.avanceTrancheRepository.findOne(filters);
      }
    findByIdavancetranche(id:string){
        return this.avanceTrancheRepository.findOne(id)
      }
    
    getAllavancetranche(): Promise<AvanceTranche[]> {
        return this.avanceTrancheRepository.findAll()
      }
    
    async update(id:string, input: AvanceTrancheUpdateInput): Promise<AvanceTranche> {
        const avance = await this.findByIdavancetranche(id)
          // if (input.tranche) {
          //     const tranche =
          //     input.trancheStudentId &&
          //       (await this.trancheStudent.findByOne({ id: input.trancheStudentId}));
        
          //     if (!tranche) {
          //       throw new NotFoundError('inscription no exist' || '');
          //     }
          //     this.trancheStudent.update(tranche.id, input.tranche);
          // }
  
   
          wrap(avance).assign({
              name:input.name || avance.name,
              montant: input.montant || avance.montant,
              description: input.description || avance.description,
          },
          { em: this.em },
          );
          await this.avanceTrancheRepository.persistAndFlush(avance);
          return avance;
      }


    async deleteavancetranche(id:string):Promise<AvanceTranche>{
      const a = this.findByIdavancetranche(id)
      await this.avanceTrancheRepository.removeAndFlush(a);
      if(!a){
       throw console.error("not found");
      }
      return a
    }

  async SumAvanceTrancheByTranche(trancheid:string){
    const a = (await this.em.find(AvanceTranche,{tranche:trancheid})).map(a=>a.montant).reduce(function(a,b){return a+b})
    return a
  }

  async AmountMostRecentAvanceTranche(trancheid:string){
    const a = (await this.em.find(AvanceTranche,{tranche:trancheid})).slice(-1)[0].montant
    return a
  }

  async MostRecentAvanceTranche(){
   return (await this.getAllavancetranche()).slice(-1)[0].montant
  }

  findBytranchestudent(id: string) {
    return this.avanceTrancheRepository.find({trancheStudent:id});
  }

  async AmountRecentAvanceTrancheByStudent(studentid:string){
    
    const b  = (await this.trancheStudentservice.findByStudent(studentid))
    const a  = (await this.findBytranchestudent(b.id)).slice(-1)[0].montant
    return a
    
  }

  async SumAvanceTrancheByStudent(studentid:string,trancheid:string){
     const a = (await this.trancheStudentservice.findByStudent(studentid))
//   return (await this.findBytranchestudent(a.id)).filter(async a=>(await a.tranche.load()).id==trancheid).map(a=>a.montant).reduce(function(a,b){return a+b})
    //  const c = (await this.findBytranchestudent(a.id))
     return (await this.em.find(AvanceTranche,{tranche:a.id})).filter(async a=>(await a.tranche.load()).id==trancheid).map(a=>a.montant).reduce(function(a,b){return a+b})

 }
}