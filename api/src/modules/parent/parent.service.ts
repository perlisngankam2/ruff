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
import { Field, ID, ObjectType} from '@nestjs/graphql';
import { Parent } from 'src/entities/parent.entity';
import { UserService } from '../user/user.service';
import { ParentCreateInput } from './dto/parent.input';
import { ParentUpdateInput } from './dto/parent.update';

@Entity()
@ObjectType()
export class ParentService {
    constructor(
        @InjectRepository(Parent)
        private parentRepository: EntityRepository<Parent>,
        private userService : UserService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: ParentCreateInput,
      ): Promise<Parent> {        
        const parent = new Parent()

        const user = input.user
                ? await this.userService.findOne(input.user)
                : await this.userService.create(input.user)

        parent.firstname = input.firstname
        parent.lastname = input.lastname
        parent.profession = input.profession
        parent.email = input.email
        parent.phonenumber=input.phonenumber
        parent.user.id = user.id
        
        await this.parentRepository.persistAndFlush(parent)
        return parent
      }
    
      findOne(filters: FilterQuery<Parent>): Promise<Parent | null> {
        return this.parentRepository.findOne(filters);
      }
      findById(id:string){
        return this.parentRepository.findOne(id)
      }
    
      getAll(): Promise<Parent[]> {
        return this.parentRepository.findAll()
      }
      
      async update(id:string, input: ParentUpdateInput): Promise<Parent> {
        const parent =await this.findById(id)
        if(input.user){
            const user =
            input.user?.ID &&
              (await this.userService.findOne({ id: input.user?.ID }));

              if (!user) {
                throw new NotFoundError('user no exist' || '');
              }
              this.userService.update(user.id, input.user);
        }
        wrap(parent).assign({
            firstname:input.firstname,
            lastname:input.lastname,
            profession:input.profession,
            email:input.email,
            phonenumber:input.phonenumber
            },
            { em: this.em },
    );
        await this.parentRepository.persistAndFlush(parent);
        return parent;
      }
      async delete(id:string){
        const a = this.findById(id)
        await this.parentRepository.removeAndFlush(a)
        if(!a){
        throw Error("not found")
        }
        return a
      }   
}