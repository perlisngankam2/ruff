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
        @Inject(forwardRef(() => StudentService))
        private studentservice: StudentService,
        @Inject(forwardRef(() => TrancheService))
        private trancheservice: TrancheService,
        private  em: EntityManager,
      ) {}
    
async SumAvanceTrancheByStudent(studentid:string,trancheid:string){
        const avancetranche = await this.findBystudentandtranche(studentid,trancheid)
        console.log('==============================>'+avancetranche)
   
        console.log(avancetranche)
   
        if(avancetranche.length==0){
         throw Error("Aucune avance a ete fait pour cette tranche")
        }
    
        return avancetranche.map(a=>a.montant).reduce(function(a,b){return a+b});
      }

async createavancetranche(
        input: AvanceTrancheCreateInput,
      ): Promise<AvanceTranche>|null {  
        const avanceTranche = new AvanceTranche()

       const student = await this.studentservice.findByOne(input.studentId)
      //  const reduction = (await (student).categorie.load()).reductionScolarite.load()

        console.log('tranchestudent------->',student)
        // console.log('reduction========>',reduction)
        
        const tranche = await this.trancheservice.findByOne(input.trancheId)

        if(!tranche && !student){
          throw Error("!!!!!!!!!!!!!!tranche and student not found!!!!!!!!!!!!!!!!!!!!!!")
        }
        wrap(avanceTranche).assign({
          montant: Number(input.montant),
          name: input.name,
          description: input.description,
          student: student.id,
          tranche: tranche.id
          
          },
          {
          em:this.em
          })
          // const totalamount= Number((await this.findBystudent(student.id)).map(a=>a.montant).reduce(function(a,b){return a+b}))
          const trancheamount = Number(this.SumAvanceTrancheByStudent(student.id,tranche.id))
          if(trancheamount == tranche.montant){
          throw Error("!!!!!!ALORS VOUS NE POUVEZ PLUS FAIRE DES AVANCES CAR LA SOMME DE LA TRANCHE A ETE ATTEINTE!!!!!!!!!!!!")  
          }
          
        //   if((await reduction).pourcentage != 0){
        //     const newValue = tranche.montant -tranche.montant*(await reduction).pourcentage
        //     if(input.montant < newValue){
        // // create the avance tranche
        //         wrap(avanceTranche).assign({
        //         montant: Number(input.montant),
        //         name: input.name,
        //         description: input.description,
        //         student: student.id,
        //         tranche:tranche.id,
        //         complete: false
        //         },
        //         {
        //           em:this.em
        //         })
        //         this.avanceTrancheRepository.persistAndFlush(avanceTranche)
        //         this.trancheStudentservice.saveTranche(student.id,tranche.id)
        //         return avanceTranche   
        //       }
             
        //       avanceTranche.complete=true
        //       this.avanceTrancheRepository.persistAndFlush(avanceTranche)
        //       this.trancheStudentservice.saveTranche(student.id,tranche.id)
        //       return avanceTranche
        //   }

        //   if((await reduction).montant!= 0){
        //     const newValue = tranche.montant - tranche.montant*(await reduction).pourcentage
        //     if(input.montant < newValue){
        //         // create the avance tranche
        //       wrap(avanceTranche).assign({
        //       montant: Number(input.montant),
        //       name: input.name,
        //       description: input.description,
        //       student: student.id,
        //       tranche: tranche.id,
        //       complete: false
        //       },
        //       {
        //         em:this.em
        //       })
        //       this.avanceTrancheRepository.persistAndFlush(avanceTranche)
        //       this.trancheStudentservice.saveTranche(student.id,tranche.id)
        //       return avanceTranche
        //       // console.log('===========>'+inscript)   
        //     }

           
        //     avanceTranche.complete=true 
        //     this.avanceTrancheRepository.persistAndFlush(avanceTranche)
        //     this.trancheStudentservice.saveTranche(student.id,tranche.id)
        //     return avanceTranche
        // }

          if(input.montant < trancheamount){
              // create avance inscription
              wrap(avanceTranche).assign({
              montant: Number(input.montant)||0.0,
              name: input.name,
              description: input.description,
              student: student.id,
              tranche: tranche.id,
              complete: false
              },
              {
              em:this.em
              })

              // ici je dois verifier si l'accumulation de toutes les montants des avances d'une inscription
              this.avanceTrancheRepository.persistAndFlush(avanceTranche)
              this.trancheStudentservice.saveTranche(student.id,tranche.id)
              
              return avanceTranche   
        }



          this.avanceTrancheRepository.persistAndFlush(avanceTranche)
          this.trancheStudentservice.saveTranche(student.id,tranche.id)
         
          return avanceTranche
}
    
findByOneavancetranche(filters: FilterQuery<AvanceTranche>): Promise<AvanceTranche | null> {
        return this.avanceTrancheRepository.findOne(filters);
      }
findByIdavancetranche(id:string){
        return this.avanceTrancheRepository.findOne(id)
      }
    
getAllavancetranche(): Promise<AvanceTranche[]> {
        return this.avanceTrancheRepository.findAll({
          populate:true
        })
      }
    
async update(id:string, input: AvanceTrancheUpdateInput): Promise<AvanceTranche> {
        const avance = await this.findByIdavancetranche(id)
  
   
          wrap(avance).assign({
              name:input.name || avance.name,
              montant: input.montant || avance.montant,
              description: input.description || avance.description,
              tranche: input.trancheId,
              student:input.studentId
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

async  findBystudent(id: string):Promise<AvanceTranche[]> {
    return await this.avanceTrancheRepository.find({student:id})
  }
async  findBystudentandtranche(studentid: string,trancheid:string):Promise<AvanceTranche[]> {
    return await this.avanceTrancheRepository.find({student:studentid,tranche:trancheid,})
  }

async  findBytranche(id: string):Promise<AvanceTranche[]> {
    return await this.avanceTrancheRepository.find({tranche:id})
  }

async AmountRecentAvanceTrancheByStudent(studentid:string){
    const c = (await this.findBystudent(studentid))
    if(c.length==0){
      throw Error("avancestranches for this student does not exist!!!!!!!!!!!!!")
    }
    const a= c[c.length-1].montant
    return a
  }

async TranchecompletedByStudent(studentid:string){
    const tranchestudent = await this.trancheStudentservice.findByStudent(studentid)
    console.log('==============================>'+tranchestudent)

    const where = {};

    // if (studentid) {
    //   where['student'] = studentid;
    // }

    // const avancetranche = await this.em.find(AvanceTranche, where, {
    //   populate: true,
    //   orderBy: { id: 'ASC' },
    // });

    console.log(tranchestudent)

   
   const a=tranchestudent.map(a=>a.tranche.load())
   const tranches = await this.trancheservice.getAll()
   

   if(a.length==1){
    if ((await a[0]).id) {
      where['tranche'] = (await a[0]).id;
    }
    // const avancetranche = await this.em.find(AvanceTranche, where, {
    //   populate: true,
    //   orderBy: { id: 'ASC' },
    // });
    // const total= avancetranche.map(a=>a.montant).reduce(function(a,b){return a+b})
    const total = Number(this.SumAvanceTrancheByStudent(studentid,(await a[0]).id))
  
    if(total == tranches[0].montant){
     return a[0]
    }
    console.log("cette tranche n'est pas encore complete")
   }

   if(a.length==2){
    if ((await a[0]).id) {
      where['tranche'] = (await a[0]).id;
    }
    // const avancetranche = await this.em.find(AvanceTranche, where, {
    //   populate: true,
    //   orderBy: { id: 'ASC' },
    // });
    const total = Number(this.SumAvanceTrancheByStudent(studentid,(await a[0]).id))

    if ((await a[1]).id) {
      where['tranche'] = (await a[1]).id;
    }
    // const avancetranche1 = await this.em.find(AvanceTranche, where, {
    //   populate: true,
    //   orderBy: { id: 'ASC' },
    // });
    const total1 = Number(this.SumAvanceTrancheByStudent(studentid,(await a[1]).id))

    if(total == tranches[0].montant && total1 == tranches[1].montant){
     return [a[0],a[1]]
    }
    console.log("la deuxieme tranche n'est pas complete")
    return [a[0]]
   }

   if(a.length==3){
    if ((await a[0]).id) {
      where['tranche'] = (await a[0]).id;
    }
    // const avancetranche = await this.em.find(AvanceTranche, where, {
    //   populate: true,
    //   orderBy: { id: 'ASC' },
    // });
    const total = Number(this.SumAvanceTrancheByStudent(studentid,(await a[0]).id))
    if ((await a[1]).id) {
      where['tranche'] = (await a[1]).id;
    }
    // const avancetranche1 = await this.em.find(AvanceTranche, where, {
    //   populate: true,
    //   orderBy: { id: 'ASC' },
    // });
    const total1 = Number(this.SumAvanceTrancheByStudent(studentid,(await a[1]).id))

    if ((await a[2]).id) {
      where['tranche'] = (await a[2]).id;
    }
    // const avancetranche2 = await this.em.find(AvanceTranche, where, {
    //   populate: true,
    //   orderBy: { id: 'ASC' },
    // });
    const total2 = Number(this.SumAvanceTrancheByStudent(studentid,(await a[2]).id))
  
    if(total == tranches[0].montant && total1 == tranches[1].montant && total2 == tranches[2].montant){
     return [a[0],a[1],a[2]]
    }
    console.log("la troisieme tranche n'est pas complete")
    return [a[0],a[1]]
   }

 
  }

async feesalreadypayed(studentid:string){
    const avancetranche= await this.findBystudent(studentid)
    console.log('==============================>'+avancetranche)

    console.log(avancetranche)

    return avancetranche.map(a=>a.tranche.load())

   }

async ResttuitionfeeByStudent(studentid:string){
        const z = (await this.trancheStudentservice.findByStudent(studentid))
        if(z.length==0){
         throw Error("student not found in tranchestudent!!!!!!!!!!")
        }
        return  z.map(a=>a.reste)     
    }

// async RestTrancheByStudent(studentid:string,trancheid:string){
//      const z = (await this.trancheStudentservice.findByTrancheandStudent(studentid,trancheid))
//      if(!z){
//       throw Error("student not found in tranchestudent!!!!!!!!!!")
//      }
  
    
//     this.

//      console.log(avancetranche)

//      if(avancetranche==null){
//       throw Error("Aucune avance a ete fait pour cette tranche")
//      }
 
//     const e= avancetranche.map(a=>a.montant).reduce(function(a,b){return a+b});

//     //pour m'assurer qu'il a deja commencer a payer une tranche
//     const t = await this.feesalreadypayed(studentid)
    
//     const tranche= this.trancheservice.findByOne(trancheid)
//     const y= t.filter(async a=>(await a).id==(await tranche).id)

//     if(y!=null){
//       if((await tranche).montant>=e)
//         return ((await tranche).montant-e)
//       throw Error("la tranche est inferieur aux avances de cette tranche!!!!!!!!!!!!")
//     }
//     throw Error("the student has not yet started paying a fee!!!!!!!!!!!!!!!!!!!!!")
    
   
//    }

//    if(student==null)  {
           
//     //ici create(input.map(a=>a.tranchestudentinput)[0]) 
//     const tranchestudents= this.trancheStudentservice.create(input.tranchestudentinput) 
//     console.log("========>"+tranchestudents)
//     const student = (await tranchestudents).student.load()
//     const reduction = (await (await student).categorie.load()).reductionScolarite.load()
//     const fraistranche = tranche.montant


//   wrap(avanceTranche).assign({
//     montant: Number(input.montant),
//     name: input.name,
//     description: input.description,
//     trancheStudent:(await tranchestudents).id,
//     tranche: input.trancheId
    
//   },
//   {
//     em:this.em
//   })

//   // if((await reduction).pourcentage != 0){
//   //   const newValue = (await tranche.tranche.load()).montant - (await tranche.tranche.load()).montant*(await reduction).pourcentage
//   //   avanceTranche.reste = newValue - tranche.montant
//   //   if(avanceTranche.reste == 0){
//   //       avanceTranche.complete = true
//   //   }
//   // }

//   // if((await reduction).montant != 0){
//   //   const newValue = (await tranche.tranche.load()).montant - (await reduction).montant
//   //   avanceTranche.reste = newValue - tranche.montant
//   //   if(avanceTranche.reste == 0){
//   //     avanceTranche.complete = true
//   //   }
//   // }
// if ((await this.findBytranchestudent((await tranchestudents).id)).map(a=>a.montant).length>=1) 
//   {
//     const totalamount= Number((await this.findBytranchestudent((await tranchestudents).id)).map(a=>a.montant).reduce(function(a,b){return a+b}))
  
//     if(totalamount == tranche.montant){

//       throw Error("!!!!!!ALORS VOUS NE POUVEZ PLUS FAIRE DES AVANCES CAR LA SOMME DE LA PENSION A ETE ATTEINTE!!!!!!!!!!!!")  
//       //get all the fees to be paied by the student
//       const fees= await this.studentservice.findlistfees((await student).id)

//       //get all the fees already paied by the student
//       const t = await this.feesalreadypayed((await student).id)
//       //check wether or not the tranche belongs to the list of tranches the student has to
//       // const 
//       // get surplus of a tranche student and add in another as an avance
//     // if(t.length>=1){
//     //   if((await t[0]).id==tranche.id)
//     //     if(await this.SumAvanceTrancheByStudent((await student).id, (await t[0]).id)>tranche.montant){
//     //       const first_surplus = await this.SumAvanceTrancheByStudent((await student).id, (await t[0]).id) - (await t[0]).montant

//     //       if(fees!=null)  {
//     //             wrap(avanceTranche).assign({
//     //               montant: Number(first_surplus),
//     //               name: input.name,
//     //               description: input.description,
//     //               trancheStudent: (await tranchestudents).id,
//     //               tranche:fees[1].id,
//     //               complete: false
//     //               },
//     //               {
//     //                 em:this.em
//     //               })
//     //               this.trancheStudentservice.saveTranche((await tranchestudents).id)
//     //               this.avanceTrancheRepository.persistAndFlush(avanceTranche)
//     //               if(avanceTranche==null){
//     //                 throw Error("")
//     //               }
//     //                return avanceTranche
//     //       }
          
//     //     }  
        
//     //   if((await t[1]).id==tranche.id)
//     //     if(await this.SumAvanceTrancheByStudent((await student).id, (await t[1]).id)>tranche.montant){
//     //       const second_surplus = await this.SumAvanceTrancheByStudent((await student).id, (await t[1]).id) - (await t[1]).montant

//     //       if(fees!=null)  {
//     //             wrap(avanceTranche).assign({
//     //               montant: Number(second_surplus),
//     //               name: input.name,
//     //               description: input.description,
//     //               trancheStudent: (await tranchestudents).id,
//     //               tranche:fees[2].id,
//     //               complete: false
//     //               },
//     //               {
//     //                 em:this.em
//     //               })
//     //               this.trancheStudentservice.saveTranche((await tranchestudents).id)
//     //               this.avanceTrancheRepository.persistAndFlush(avanceTranche)
//     //               if(avanceTranche==null){
//     //                 throw Error("")
//     //               }
//     //                return avanceTranche
//     //       }
          
//     //     }   
//     //   }

      
     
//     }

//   }



//   if((await reduction).pourcentage != 0){
//     const newValue = (await tranchestudent.tranche.load()).montant - (await tranchestudent.tranche.load()).montant*(await reduction).pourcentage
//      if(input.montant < newValue){
//          // create the avance tranche
//         wrap(avanceTranche).assign({
//         montant: Number(input.montant),
//         name: input.name,
//         description: input.description,
//         trancheStudent: (await tranchestudents).id,
//         tranche:tranche.id,
//         complete: false
//         },
//         {
//           em:this.em
//         })
//         this.trancheStudentservice.saveTranche((await tranchestudents).id)
//         this.avanceTrancheRepository.persistAndFlush(avanceTranche)
//         if(avanceTranche==null){
//           throw Error("")
//         }
//          return avanceTranche
//         // console.log('===========>'+inscript)   
//      }
//     //  tranchestudent.complete = true
//      avanceTranche.complete=true
//      this.trancheStudentservice.saveTranche((await tranchestudents).id)
//      this.avanceTrancheRepository.persistAndFlush(avanceTranche)
//      if(avanceTranche==null){
//       throw Error("")
//     }
//   return avanceTranche
//   }

//   if((await reduction).montant!= 0){
//     const newValue = tranche.montant - tranche.montant*(await reduction).pourcentage
//      if(input.montant < newValue){
//          // create the avance tranche
//         wrap(avanceTranche).assign({
//         montant: Number(input.montant),
//         name: input.name,
//         description: input.description,
//         trancheStudent:(await tranchestudents).id,
//         tranche: tranche.id,
//         complete: false
//         },
//         {
//           em:this.em
//         })
//         this.trancheStudentservice.saveTranche((await tranchestudents).id)
//         this.avanceTrancheRepository.persistAndFlush(avanceTranche)
//         if(avanceTranche==null){
//           throw Error("")
//         }
//          return avanceTranche
//         // console.log('===========>'+inscript)   
//      }

 
//     //  tranchestudent.complete = true
//      avanceTranche.complete=true
//      this.trancheStudentservice.saveTranche((await tranchestudents).id)
//      this.avanceTrancheRepository.persistAndFlush(avanceTranche)
//      if(avanceTranche==null){
//       throw Error("")
//     }
//      return avanceTranche
//   }

//   if(input.montant < fraistranche){
//     // create avance inscription
//     wrap(avanceTranche).assign({
//      montant: Number(input.montant)||0.0,
//      name: input.name,
//      description: input.description,
//      trancheStudent: (await tranchestudents).id,
//      tranche: tranche.id,
//      complete: false
//      },
//      {
//        em:this.em
//      })

//      // ici je dois verifier si l'accumulation de toutes les montants des avances d'une inscription
//      this.trancheStudentservice.saveTranche((await tranchestudents).id)
//      this.avanceTrancheRepository.persistAndFlush(avanceTranche)
//      if(avanceTranche==null){
//       throw Error("")
//     }
//      return avanceTranche
   
//   }
    

//   // tranchestudent.complete = true
//   avanceTranche.complete = true
//   this.trancheStudentservice.saveTranche((await tranchestudents).id)
//   this.avanceTrancheRepository.persistAndFlush(avanceTranche)
//   if(avanceTranche==null){
//     throw Error("")
//   }
// return avanceTranche
// }



// ///!!!!!!!!!!!!!!!  SI L'INSCRIPTION EXISTANT EST CORRECT !!!!!!!

// if(tranchestudent!= null)  
// {
// // throw Error("tranchestudent not found")
// //  const student = (tranchestudent).student.load()

// //  const reduction = (await (await student).categorie.load()).reductionScolarite.load()


// const fraistranche = tranche.montant


// wrap(avanceTranche).assign({
// montant: Number(input.montant),
// name: input.name,
// description: input.description,
// trancheStudent: tranchestudent.id,
// tranche: input.trancheId

// },
// {
// em:this.em
// })


// if ((await this.findBytranchestudent(tranchestudent.id)).map(a=>a.montant).length>=1) {
// const totalamount= Number((await this.findBytranchestudent(tranchestudent.id)).map(a=>a.montant).reduce(function(a,b){return a+b}))

// if(totalamount == tranche.montant){
// throw Error("!!!!!!ALORS VOUS NE POUVEZ PLUS FAIRE DES AVANCES CAR LA SOMME DE LA PENSION A ETE ATTEINTE!!!!!!!!!!!!")  
// }


// }


// //  if((await reduction).pourcentage != 0){
// //    const newValue = (await tranchestudent.tranche.load()).montant - (await tranchestudent.tranche.load()).montant*(await reduction).pourcentage
// //     if(input.montant < newValue){
// //         // create the avance tranche
// //        wrap(avanceTranche).assign({
// //        montant: Number(input.montant),
// //        name: input.name,
// //        description: input.description,
// //        trancheStudent: tranchestudent.id,
// //        tranche:tranche.id,
// //        complete: false
// //        },
// //        {
// //          em:this.em
// //        })
// //        this.trancheStudentservice.saveTranche(tranchestudent.id)
// //        this.avanceTrancheRepository.persistAndFlush(avanceTranche)
// //        return avanceTranche
// //        // console.log('===========>'+inscript)   
// //     }
// //     tranchestudent.complete = true
// //     avanceTranche.complete=true
// //     this.trancheStudentservice.saveTranche(tranche.id)
// //     this.avanceTrancheRepository.persistAndFlush(avanceTranche)
// //     return avanceTranche
// //  }

// //  if((await reduction).montant!= 0){
// //    const newValue = tranche.montant - tranche.montant*(await reduction).pourcentage
// //     if(input.montant < newValue){
// //         // create the avance tranche
// //        wrap(avanceTranche).assign({
// //        montant: Number(input.montant),
// //        name: input.name,
// //        description: input.description,
// //        trancheStudent: tranchestudent.id,
// //        tranche: tranche.id,
// //        complete: false
// //        },
// //        {
// //          em:this.em
// //        })
// //        this.trancheStudentservice.saveTranche(tranchestudent.id)
// //        this.avanceTrancheRepository.persistAndFlush(avanceTranche)
// //        return avanceTranche
// //        // console.log('===========>'+inscript)   
// //     }

// //     tranchestudent.complete = true
// //     avanceTranche.complete=true
// //     this.trancheStudentservice.saveTranche(tranchestudent.id)
// //     this.avanceTrancheRepository.persistAndFlush(avanceTranche)
// //     return avanceTranche
// //  }

// if(input.montant < fraistranche){
// // create avance inscription
// wrap(avanceTranche).assign({
// montant: Number(input.montant)||0.0,
// name: input.name,
// description: input.description,
// trancheStudent: tranchestudent.id,
// tranche: tranche.id,
// complete: false
// },
// {
//  em:this.em
// })

// // ici je dois verifier si l'accumulation de toutes les montants des avances d'une inscription
// this.trancheStudentservice.saveTranche(tranchestudent.id)
// this.avanceTrancheRepository.persistAndFlush(avanceTranche)
// if(avanceTranche==null){
// throw Error("")
// }
// return avanceTranche

// }



// tranchestudent.complete = true
// this.trancheStudentservice.saveTranche(tranchestudent.id)
// this.avanceTrancheRepository.persistAndFlush(avanceTranche)
// if(avanceTranche==null){
// throw Error("")
// }
// return avanceTranche
// }


// return avanceTranche

 }




