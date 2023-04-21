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
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Pension } from 'src/entities/pension.entity';
import { AnneeAccademiqueService } from '../anne_accademique/anne-accademique.service';
import { NiveauEtudeService } from '../niveau_etude/niveau-etude.service';
import { SalleService } from '../salle/salle.service';
import { PensionCreateInput } from './dto/pension.input';
import { PensionUpdateInput } from './dto/pension.update';
import { format } from 'date-fns';
import { StudentService } from '../student/student.service';
import { TrancheStudentService } from '../tranche-student/tranche-student.service';

@Injectable()
export class PensionService {
    constructor(
        @InjectRepository(Pension)
        private pensionRepository: EntityRepository<Pension>,
        @Inject(forwardRef(() => StudentService))
        private studentservice: StudentService,
        @Inject(forwardRef(() => TrancheStudentService))
        @Inject(forwardRef(() => TrancheStudentService))
        private trancheStudentservice: TrancheStudentService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: PensionCreateInput,
      ): Promise<Pension> {  

        const pension = new Pension()

        const student = await this.studentservice.findByOne(input.studentId)
        if(!student){
          throw Error('!!!!!!!!!!!!!!!!!STUDENT DOES NOT EXISTS!!!!!!!!!!!!!!!!!!')
        }
       

        wrap(pension).assign(
          {
            montantPension:0.00000,
            name: input.name,
            description: input.description,
            // anneeAccademique: input.anneeAcademiqueId,
            dateLine: input.dateLine,
            student: student.id
            
          },
          {
            em:this.em
          }
        )
        
        await this.pensionRepository.persistAndFlush(pension)
        return pension
      }
    
      findByOne(filters: FilterQuery<Pension>): Promise<Pension | null> {
        return this.pensionRepository.findOne(filters);
        }
      findById(id:string){
        return this.pensionRepository.findOne(id)
      }
    
      getAll(): Promise<Pension[]> {
        return this.pensionRepository.findAll()
      }

      // async savePension(studentid:string){
      //   // const montantpension = (await this.trancheStudentservice.findByStudent(studentid)).map(a=>a.montant).reduce(function(a,b){return a+b})
      //   const trancheStudent = await this.trancheStudentservice.findByStudents(studentid)
      //   console.log(">>>>>>>>>"+ " " +trancheStudent )
      //   const montantpension = trancheStudent.map(a=>a.montant).reduce(function(a,b){return a+b})
      //   const pension = await this.findpensionbystudent(studentid)
      //   const fees_to_be_paied = await this.studentservice.getclassfeebystudent(studentid)

      //   if(pension==null){
      //     const pension = new Pension()
      //     wrap(pension).assign({
      //       montantPension:0.0000,
      //       student: studentid
      //     },
      //     {
      //       em:this.em
      //     })

      //     await this.pensionRepository.persistAndFlush(pension)
      //     pension.montantPension = montantpension

      //     if(pension.montantPension == fees_to_be_paied){
      //       pension.complete = true
      //       // tranche.regimePaimemnt = RegimePaiement.NORMAL
      //       pension.reste = 0.0
      //   }

      //     if(pension.montantPension > fees_to_be_paied){
      //       pension.complete = true
      //       // tranche.regimePaimemnt = RegimePaiement.NORMAL
      //       pension.surplus = pension.montantPension - fees_to_be_paied
      //   }   

      //     if(pension.montantPension < fees_to_be_paied){
      //       pension.complete = false
      //       pension.reste =  fees_to_be_paied - pension.montantPension
      //   }
        
      //     await this.pensionRepository.persistAndFlush(pension)
      //     return pension
      //   }

      //   if(pension!=null){

      //     pension.montantPension = montantpension

      //     if(pension.montantPension == fees_to_be_paied){
      //       pension.complete = true
      //       // tranche.regimePaimemnt = RegimePaiement.NORMAL
      //       pension.reste = 0.0
      //   }

      //     if(pension.montantPension > fees_to_be_paied){
      //       pension.complete = true
      //       // tranche.regimePaimemnt = RegimePaiement.NORMAL
      //       pension.surplus = pension.montantPension - fees_to_be_paied
      //   }   

      //     if(pension.montantPension < fees_to_be_paied){
      //       pension.complete = false
      //       pension.reste =  fees_to_be_paied - pension.montantPension
      //   }
        
      //     await this.pensionRepository.persistAndFlush(pension)
      //     return pension
      //   }

      // }


      // async savePension(studentid:string){
      //   // const montantpension = (await this.trancheStudentservice.findByStudent(studentid)).map(a=>a.montant).reduce(function(a,b){return a+b})
      //   const tranchestudent = await this.trancheStudentservice.findByStudents(studentid)
      //   console.log('========>'+tranchestudent)
      //   const montantpension = tranchestudent.map(a=>a.montant).reduce(function(a,b){return a+b})
      //   const pension = await this.findpensionbystudent(studentid)
      //   const fees_to_be_paied = await this.studentservice.getclassfeebystudent(studentid)

      //   while((await this.getAll()).filter(async a=>(await a.student.load()).id==studentid).length<=1){
          
        
      //   if(pension==null && (await this.getAll()).filter(async a=>(await a.student.load()).id==studentid).length==0){
      //     const pension = new Pension()
      //     wrap(pension).assign({
      //       montantPension:0.0000,
      //       student: studentid
      //     },
      //     {
      //       em:this.em
      //     })

      //     await this.pensionRepository.persistAndFlush(pension)
      //     pension.montantPension = montantpension

      //     if(pension.montantPension == fees_to_be_paied){
      //       pension.complete = true
      //       // tranche.regimePaimemnt = RegimePaiement.NORMAL
      //       pension.reste = 0.0
      //   }

      //     if(pension.montantPension > fees_to_be_paied){
      //       pension.complete = true
      //         // tranche.regimePaimemnt = RegimePaiement.NORMAL
      //         pension.surplus = pension.montantPension - fees_to_be_paied
      //       }   

      //         if(pension.montantPension < fees_to_be_paied){
      //           pension.complete = false
      //           pension.reste =  fees_to_be_paied - pension.montantPension
      //         }
                      
      //           await this.pensionRepository.persistAndFlush(pension)
      //           return pension
          
      //         }
              
      //           if(pension!=null && (await this.getAll()).filter(async a=>(await a.student.load()).id==studentid).length==1){
        
      //             pension.montantPension = montantpension
      //             if(pension.montantPension == fees_to_be_paied){
      //               pension.complete = true
      //               // tranche.regimePaimemnt = RegimePaiement.NORMAL
      //               pension.reste = 0.0
      //           }
              
      //           if(pension.montantPension > fees_to_be_paied){
      //             pension.complete = true
      //             // tranche.regimePaimemnt = RegimePaiement.NORMAL
      //             pension.surplus = pension.montantPension - fees_to_be_paied
      //           }   
              
      //           if(pension.montantPension < fees_to_be_paied){
      //             pension.complete = false
      //             pension.reste =  fees_to_be_paied - pension.montantPension
      //           }
      //             await this.pensionRepository.persistAndFlush(pension)
      //             return pension
      //           }
            
      //         }        
      //   }
            
      
    //   async savePension(studentid:string){
    //     try {
    //         const tranchestudent = await this.trancheStudentservice.findByStudents(studentid)
    //         console.log('========>'+tranchestudent)
    //         const montantpension = tranchestudent.map(a=>a.montant).reduce(function(a,b){return a+b})
    //         const pension = await this.findpensionbystudent(studentid)
    //         const fees_to_be_paied = await this.studentservice.getclassfeebystudent(studentid)
    
    //         if(pension==null){
    //           const pension = new Pension()
    //           wrap(pension).assign({
    //             montantPension:0.0000,
    //             student: studentid
    //           },
    //           {
    //             em:this.em
    //           })
    
    //           await this.pensionRepository.persistAndFlush(pension)
    //           pension.montantPension = montantpension
    
    //           if(pension.montantPension == fees_to_be_paied){
    //             pension.complete = true
    //             // tranche.regimePaimemnt = RegimePaiement.NORMAL
    //             pension.reste = 0.0
    //           }
    
    //           if(pension.montantPension > fees_to_be_paied){
    //             pension.complete = true
    //             // tranche.regimePaimemnt = RegimePaiement.NORMAL
    //             pension.surplus = pension.montantPension - fees_to_be_paied
    //           }   
    
    //           if(pension.montantPension < fees_to_be_paied){
    //             pension.complete = false
    //             pension.reste =  fees_to_be_paied - pension.montantPension
    //           }
            
    //           await this.pensionRepository.persistAndFlush(pension)
    //           return pension
        
    //         }
    
    //         if(pension!=null){
    
    //           pension.montantPension = montantpension
    
    //           if(pension.montantPension == fees_to_be_paied){
    //             pension.complete = true
    //             // tranche.regimePaimemnt = RegimePaiement.NORMAL
    //             pension.reste = 0.0
    //           }
    
    //           if(pension.montantPension > fees_to_be_paied){
    //             pension.complete = true
    //             // tranche.regimePaimemnt = RegimePaiement.NORMAL
    //             pension.surplus = pension.montantPension - fees_to_be_paied
    //           }   
    
    //           if(pension.montantPension < fees_to_be_paied){
    //             pension.complete = false
    //             pension.reste =  fees_to_be_paied - pension.montantPension
    //           }
            
    //           await this.pensionRepository.persistAndFlush(pension)
    //           return pension
    //         }
    //     } catch (error) {
    //         console.error('Error in savePension function:', error)
    //         throw error
    //     }
    // }
    

    async savePension(studentid:string){
      try {
          const tranchestudent = await this.trancheStudentservice.findByStudents(studentid)
          console.log('========>'+tranchestudent)
          const montantpension = tranchestudent.map(a=>a.montant).reduce(function(a,b){return a+b})
          const pension = await this.findpensionbystudent(studentid)
          const fees_to_be_paied = await this.studentservice.getclassfeebystudent(studentid)
  
          if(pension==null){
            const pension = new Pension()
            wrap(pension).assign({
              montantPension:0.0000,
              student: studentid
            },
            {
              em:this.em
            })
  
            await this.pensionRepository.persistAndFlush(pension)
            pension.montantPension = montantpension
  
            if(pension.montantPension == fees_to_be_paied){
              pension.complete = true
              // tranche.regimePaimemnt = RegimePaiement.NORMAL
              pension.reste = 0.0
            }
  
            if(pension.montantPension > fees_to_be_paied){
              pension.complete = true
              // tranche.regimePaimemnt = RegimePaiement.NORMAL
              pension.surplus = pension.montantPension - fees_to_be_paied
            }   
  
            if(pension.montantPension < fees_to_be_paied){
              pension.complete = false
              pension.reste =  fees_to_be_paied - pension.montantPension
            }
          
            await this.pensionRepository.persistAndFlush(pension)
            return pension
      
          }
  
          if(pension!=null){
  
            pension.montantPension = montantpension
  
            if(pension.montantPension == fees_to_be_paied){
              pension.complete = true
              // tranche.regimePaimemnt = RegimePaiement.NORMAL
              pension.reste = 0.0
            }
  
            if(pension.montantPension > fees_to_be_paied){
              pension.complete = true
              // tranche.regimePaimemnt = RegimePaiement.NORMAL
              pension.surplus = pension.montantPension - fees_to_be_paied
            }   
            if(pension.montantPension < fees_to_be_paied){
              pension.complete = false
              pension.reste =  fees_to_be_paied - pension.montantPension
            }
          
            await this.pensionRepository.persistAndFlush(pension)
            return pension
          }
      } catch (error) {
          console.error(error)
          throw new Error('Error in savePension function')
      }
  }
  
    

      async update(id:string, input: PensionUpdateInput): Promise<Pension> {
        const pension = await this.findById(id)
        const student = await this.studentservice.findByOne(input.studentId)
        if(!student){
          throw Error('!!!!!!!!!!!!!!!!!STUDENT DOES NOT EXISTS!!!!!!!!!!!!!!!!!!')
        }
        const montant = (await this.trancheStudentservice.findByStudents(student.id)).map(a=>a.montant).reduce(function(a,b){return a+b})
        wrap(pension).assign({
            name:input.name || pension.name,
            dateLine: input.dateLine,
            description: input.description || pension.description,
            montantPension:montant,
            student:input.studentId||pension.student
        },
        { em: this.em },
    );
        await this.pensionRepository.persistAndFlush(pension);
        return pension;
      }
      async delete(id:string){
        const a = this.findById(id)
        await this.pensionRepository.removeAndFlush(a)
        if(!a){
        throw Error("not found")
        }
        return a
      } 
      
      async findpensionbystudent(studentid:string){
        return await this.pensionRepository.findOne({student:studentid})
      }

      async findrestpensionbyatudent(studentid: string){
        return (await this.findpensionbystudent(studentid)).reste
      }
}