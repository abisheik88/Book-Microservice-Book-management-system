import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'books_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen(3000);
  await app.startAllMicroservices();
}
bootstrap();
