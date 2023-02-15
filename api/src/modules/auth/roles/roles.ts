/* eslint-disable prettier/prettier */
import { registerEnumType } from "@nestjs/graphql";

export enum Role{
    ADMIN = 'admin',
    PERSONNEL='personnel',
    ECONOME = 'econome',
    FONDATEUR = 'fondateur',
    PRINCIPAL = 'principal',
    GESTIONAIRE = 'gestionaire'
  }
  
  registerEnumType(Role, {
    name: 'Role',
  });