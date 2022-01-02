import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

export const typeORMConfigDev: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'sw-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

export const TYPEORM_CONFIG = process.env.PORT
  ? typeORMConfig
  : typeORMConfigDev;
