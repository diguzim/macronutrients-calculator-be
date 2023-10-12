import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RawIngredientsModule } from './raw-ingredients/raw-ingredients.module';
import environmentVariables from './utils/config/environment-variables';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentVariables],
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    RawIngredientsModule,
  ],
})
export class AppModule {}
