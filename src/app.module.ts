import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './module/book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './module/book/entities/book.entity';

@Module({
  imports: [
    BookModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'book',
      username: 'postgres',
      password: 'Abisheik88@',
      entities: [Book],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
