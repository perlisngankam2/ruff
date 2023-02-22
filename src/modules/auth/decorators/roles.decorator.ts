/* eslint-disable prettier/prettier */
import {SetMetadata} from '@nestjs/common';
import { Role } from '../roles/roles';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles );