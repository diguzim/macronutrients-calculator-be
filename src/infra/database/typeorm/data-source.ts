import { join } from 'path';
import { DataSource } from 'typeorm';
import { ItemSchema } from './entities/item/typeorm-item.schema';
import { MealSchema } from './entities/meal/typeorm-meal.schema';
import { UserSchema } from './entities/user/typeorm-user.schema';

// This is a hack to allow data source to be used outside of the context of the Nest app
if (!process.env.DB_HOST) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}

export const dataSource = new DataSource({
  type: 'postgres',
  ssl: false,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: false,
  logging: true,
  entities: [ItemSchema, UserSchema, MealSchema],
  migrations: [join(__dirname, 'migrations', '*.ts')],
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
});
