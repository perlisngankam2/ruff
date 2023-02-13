/* eslint-disable prettier/prettier */
import { DateType, EntityManager, FilterQuery, NotFoundError, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import * as bcript from 'bcrypt';
import { PersonnelCreateInput } from './dto/personnel.input';
import { Personnel } from 'src/entities/pesonnel.entity';
import { PersonnelUpdateInput } from './dto/personnel.update';
import { UserService } from '../user/user.service';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(Personnel)
    private personnelRepository: EntityRepository<Personnel>,
    private readonly em: EntityManager,
    private userService: UserService
  ) {}

  async createPersonnel(
    input: PersonnelCreateInput,
  ): Promise<Personnel> {

  
  // const user = await this.userService.findById(input.userId)
  // if (!user) {
  //   throw new NotFoundError('user not found'|| '');
  // }


    const new_personnel = new Personnel()
    new_personnel.name=input.name
    new_personnel.surname=input.surname
    new_personnel.dateOfBirth=new Date(input.dateOfBirth)
    new_personnel.sexe = input.sexe
    new_personnel.Matrimonialstatus = input.Matrimonialstatus
    new_personnel.childNumber = input.childNumber
    new_personnel.dateOfStartWork = new Date(input.dateOfStartWork)
    new_personnel.telephone_number = input.telephone
    new_personnel.fonction = input.fonction
    new_personnel.salary=input.salary

    await this.personnelRepository.persistAndFlush(new_personnel)
    return new_personnel
  }
    findById(id:string) {
        return this.personnelRepository.findOne(id)
    }

  findByOne(filters: FilterQuery<Personnel>): Promise<Personnel | null> {
    return this.personnelRepository.findOne(filters);
  }

  getAll(): Promise<Personnel[]> {
    return this.personnelRepository.findAll()
  }
  
  async update(id:string, input: PersonnelUpdateInput): Promise<Personnel> {
    const personnel = await this.findById(id)
    if (input.user) {
      const user =
      input.user?.ID &&
        (await this.userService.findOne({ id: input.user?.ID }));

      if (!user) {
        throw new NotFoundError('user not found' || '');
      }
      this.userService.update(user.id, input.user);
    }    
    wrap(personnel).assign({
      Matrimonialstatus: input.Matrimonialstatus || personnel.Matrimonialstatus,
      sexe: input.sexe || personnel.sexe,
      fonction: input.fonction || personnel.fonction,
      childNumber: input.childNumber || personnel.childNumber,
      dateOfBirth: input.dateOfBirth || personnel.dateOfBirth,
      dateOfStartWork: input.dateOfStartWork || personnel.dateOfStartWork
    },
    { em: this.em },
    );

    await this.personnelRepository.persistAndFlush(personnel);

    return personnel;
  }

  async delete(id:string){
  const a = this.findById(id)
  await this.personnelRepository.removeAndFlush(a)
  if(!a){
 throw Error("not found")
  }
  return a
  }

  async setPassword(account: Personnel, password: string): Promise<Personnel> {
    account.password = this.hashPassword(password);

    await this.personnelRepository.persistAndFlush(account);

    return account;
  }

  hashPassword(password: string): string {
    const salt = bcript.genSaltSync();
    return bcript.hashSync(password, salt);
  }

}















