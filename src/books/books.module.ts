import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { booksProvider } from 'src/books/books.provider';
import { BooksController } from './books.controller';
import { BooksService } from './book.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [BooksService, ...booksProvider],
})
export class BooksModule {}