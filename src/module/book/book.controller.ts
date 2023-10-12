import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBook) {
    return this.bookService.create(createBook);
  }

  @Post('find-user')
  findUser(@Body() bookName) {
    return this.bookService.findUser(bookName);
  }

  @EventPattern('bookName')
  bookName(payload: any) {
    return this.bookService.findBook(payload);
  }
}
