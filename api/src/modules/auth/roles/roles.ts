/* eslint-disable prettier/prettier */
import { registerEnumType } from "@nestjs/graphql";

export enum Role{
    ADMIN = 'ADMIN',
    PERSSONNEL='PERSONNEL',
    ECONOME = 'ECONOME',
    FONDATEUR = 'FONDATEUR',
    PRINCIPAL = 'PRINCIPAL',
    GESTIONAIRE = 'GESTIONAIRE'
  }
  
  registerEnumType(Role, {
    name: 'Role',
  });