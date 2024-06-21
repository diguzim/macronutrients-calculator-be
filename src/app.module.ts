import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from './infra/http/http.module';
import { environmentVariablesValidationSchema } from './utils/config/environment-variables-validation-schema';
import environmentVariables from './utils/config/environment-variables';

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
    // MongooseModule.forRoot(process.env.MONGO_URL),
    HttpModule,
  ],
})
export class AppModule {}
