import { defineConfig } from '@mikro-orm/postgresql'
import { QrEntity } from '../qr/qr.entity'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  metadataProvider: TsMorphMetadataProvider,
  entities: [QrEntity],            // runtime (dist)
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  driverOptions: process.env.DB_SSL === 'true'
    ? { connection: { ssl: { rejectUnauthorized: false } } }
    : {},
  migrations: {
    path: 'migrations',
    pathTs: 'migrations',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
  },
  debug: false,
})
