/* eslint-disable prettier/prettier */
import { EntityManager, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import * as bcript from 'bcrypt';
import { UserCreateInput } from './dto/user.input';
import { UpdateUserInput } from './dto/user.update';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  hashpass(password:string):string{
    const salt = bcript.genSaltSync();
    return bcript.hashSync(password, salt);

  }

  async setPassword(account: User, password: string): Promise<User> {
    account.password = this.hashpass(password);

    await this.userRepository.persistAndFlush(account);

    return account;
  }

  async create(
    input: UserCreateInput,
  ): Promise<User> {
    const new_user = new User()
    wrap(new_user).assign(
      {
    lastName: input.lastName,
    password: this.hashpass(input.password),
    firstName: input.firstName,
    email: input.email,
    phoneNumber: input.phoneNumber,
    role: input.role
      },
      {
        em: this.em
      }
    )
    

    const user = await this.findOne({
      email: new_user.email
    })
    if(user){
      throw new Error('User already exists!!!!!!!!!!')
    }

    await this.userRepository.persistAndFlush(new_user)
    return new_user
  }

  findOne(filters: FilterQuery<User>): Promise<User | null> {
    return this.userRepository.findOne(filters);
  }

  findById(id:string){
    return this.userRepository.findOne(id)
  }

  findByemail(mail:string){
    return this.userRepository.findOne({email:mail})
  }

  getAll(): Promise<User[]> {
    return this.userRepository.findAll()
  }
  
  async update(id:string, input: UpdateUserInput): Promise<User> {
    const user=await this.findById(id)
    const { password, ...inputWithoutPassword } = input;

    if (password) {
        user.password = await bcript.hash(password,10)
    }
    const firstName =
      input.firstName && input.firstName.trim() !== ''
        ? input.firstName
        : user.firstName;
    const lastName =
      input.lastName && input.lastName.trim() !== ''
        ? input.lastName
        : user.lastName;

    wrap(user).assign({
      firstName,
      lastName,
      phoneNumber: inputWithoutPassword.phoneNumber || user.phoneNumber,
    });

    await this.userRepository.persistAndFlush(user);

    return user;
  }

  async delete(id:string){
    const a= this.findById(id)
    await this.userRepository.removeAndFlush(a)
    if(!a){
    throw Error("not found")
    }
    return a


  }

}