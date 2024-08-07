import { join } from 'path';
import { DataSource } from 'typeorm';

// This is a hack to allow data source to be used outside of the context of the Nest app
if (!process.env.DB_HOST) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}

export const dataSource = new DataSource({
  type: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: false,
  logging: true,
  entities: [join(__dirname, '**/*.schema.ts')],
  migrations: [join(__dirname, 'migrations', '*.ts')],
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
});
