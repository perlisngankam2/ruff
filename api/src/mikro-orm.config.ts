/* eslint-disable prettier/prettier */
import * as path from 'path';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';

const config:  MikroOrmModuleSyncOptions = {
    type: 'postgresql',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '12345',
    dbName: 'ruffschool',
    debug: true,
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    extensions: [Migrator, EntityGenerator, SeedManager],
    metadataProvider: TsMorphMetadataProvider,
    migrations: {
      path: './migrations',
      allOrNothing: true,
      disableForeignKeys: true,
    },
  };
  
  export default config;