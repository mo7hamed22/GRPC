import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { join } from 'path';
import { grpcClientOptions } from './grpc-client.options';
import { connect } from 'nats';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    grpcClientOptions,
  );
  app.listen()

}
bootstrap();
