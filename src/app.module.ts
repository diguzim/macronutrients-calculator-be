import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RawIngredientsModule } from './raw-ingredients/raw-ingredients.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    RawIngredientsModule,
  ],
})
export class AppModule {}
