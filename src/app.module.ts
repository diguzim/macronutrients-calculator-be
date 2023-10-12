import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import environmentVariables from './utils/config/environment-variables';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentVariables],
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    HttpModule,
  ],
})
export class AppModule {}
