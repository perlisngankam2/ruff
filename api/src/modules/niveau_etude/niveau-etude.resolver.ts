/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common'; 
import {
  Args,
  ID,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Parent
}from '@nestjs/graphql';
import { NiveauEtude } from 'src/entities/niveau-etude.entity';
import { PrimePersonnel } from 'src/entities/prime-personnel.entity';
import { NiveauEtudeCreateInput} from './dto/niveau-etude.input';
import { NiveauEtudeUpdateInput} from './dto/niveau-etude.update';
import { NiveauEtudeService} from './niveau-etude.service';
import { Cycle } from 'src/entities/cycle.entity';
import { CycleService } from '../cycle/cycle.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles';


@Resolver(() => NiveauEtude)
export class NiveauEtudeResolver {
  constructor(private readonly niveauEtudeService: NiveauEtudeService,
              private readonly cycleService: CycleService,) {}

  @Mutation(() => NiveauEtude)
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.PRINCIPAL)
  async createNiveauEtude(@Args('niveauEtude') Input: NiveauEtudeCreateInput) {
    return await this.niveauEtudeService.create(Input);
  }

   @Mutation(() => NiveauEtude)
  //  @UseGuards(JwtAuthGuard,RolesGuard)
  //  @Roles(Role.PRINCIPAL)
  async updateNiveauEtude(@Args('id', { type: () => String }) id: string, @Args('input')Input: NiveauEtudeUpdateInput) {
    return await this.niveauEtudeService.update(id,Input);
  }

  @Mutation(()=>NiveauEtude)
  async deleteNiveauEtude(@Args('id') id:string){
   return await this.niveauEtudeService.delete(id)
  }

  // @Query(()=>[[String],[String],[String],[String],[String]])
  // async findallniveauetude() {
  //   return await this.niveauEtudeService.getAll();
  // }
  @Query(()=>[NiveauEtude])
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.PRINCIPAL)
  async findAllNiveauEtude() {
    return await this.niveauEtudeService.getAll();
}
  
  @Query(() => NiveauEtude)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.PRINCIPAL)
  async findOneNiveauEtude(@Args('id', { type: () => String }) id: string) {
    return await this.niveauEtudeService.findByOne(id);
  }

  @Query(() => NiveauEtude, { name: 'etatInscriptionNiveau' })
  async etatInscriptionNiveau(@Args('id', { type: () => String }) id: string) {
    return await this.niveauEtudeService.etatInscriptionNiveau(id);
  }

//   @ResolveField(()=>Cycle)
//   async cycle(@Parent() niveauetude: NiveauEtude): Promise<Cycle>{
//     return await niveauetude.cycle.load()
//   }
}
