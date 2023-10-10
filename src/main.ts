import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      abortOnError: false,
    },
  );

  const configService = app.get(ConfigService);
  const port = configService.get('port');

  app.enableCors();

  await app.listen(port, '0.0.0.0');
}

bootstrap();

// bootstrap().catch((err) => {
//   fs.writeFileSync('graph.json', PartialGraphHost.toString() ?? '');
//   process.exit(1);
// });
