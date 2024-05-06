import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import environmentVariables from './utils/config/environment-variables';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from './infra/http/http.module';
import { environmentVariablesValidationSchema } from './config/environment-variables-validation-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentVariables],
      validationSchema: environmentVariablesValidationSchema,
      validationOptions: {
        presence: 'required',
        abortEarly: true,
      },
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    HttpModule,
  ],
})
export class AppModule {}
