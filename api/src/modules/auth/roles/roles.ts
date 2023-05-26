/* eslint-disable prettier/prettier */
import { registerEnumType } from "@nestjs/graphql";

export enum Role{
    ADMIN = 'admin',
    ENSEIGNANT='enseignant',
    ECONOME = 'econome',
    FONDATEUR = 'fondateur',
    PRINCIPAL = 'principal',
    GESTIONNAIRE = 'gestionnaire'
  }
  
  registerEnumType(Role, {
    name: 'Role',
  });