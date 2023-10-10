import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RawIngredientsModule } from './raw-ingredients/raw-ingredients.module';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    RawIngredientsModule,
  ],
})
export class AppModule {}
