import { Connection } from 'mongoose';
import { BooksSchema } from './schemas/books.schema';

export const booksProvider = [
  {
    provide: 'BOOK_MODEL',
    useFactory: (connection: Connection) => connection.model('Books', BooksSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];