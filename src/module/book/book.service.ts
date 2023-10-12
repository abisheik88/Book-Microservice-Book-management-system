import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository, In } from 'typeorm';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { resolve } from 'path';
import { rejects } from 'assert';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly book: Repository<Book>,
    @Inject('user_que')
    private userQ: ClientProxy,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const newBook = await this.book.create(createBookDto);
    await this.book.save(newBook);
    // this.userQue.emit('spl', createBookDto);
    return newBook;
  }

  async findBook(payload: any) {
    const b = await this.book.find({ where: { name: In(payload.book_name) } });
    const book = b.map((x) => x.book_id);
    const length = book.length;
    for (var i = 0; i < length; i++) {
      const newBook = book[i];
      await this.book.update(newBook, { user_id: payload.id });
    }
  }

  async findUser(bookName) {
    // console.log(bookName);
    const book = await this.book.findOne({ where: { name: bookName.name } });

    let a = await new Promise((resolve, reject) => {
      this.userQ.send('user-id', { id: book.user_id }).subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (err) => reject(err),
      });
    });
    return a;
  }
}
