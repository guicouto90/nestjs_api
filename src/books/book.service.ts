import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateBookDto } from "./dto/create-books.dto";
import { Book } from "./interfaces/books.interface";

@Injectable()
export class BooksService {

  constructor(
    @Inject('BOOK_MODEL')
    private booksModel: Model<Book>
  ) {}

  async verifyBookById(id: string): Promise<Book> {
    const book = await this.booksModel.findById(id)
    if(!book) throw new NotFoundException('Livro nao encontrado')
    return book
  }

  async bookPermission(id: string, username: string) {
    const book = await this.verifyBookById(id)
    if(book.username !== username) throw new UnauthorizedException("Usuario nao tem permissao nesse livro")

    return book
  }
  
  async getAll(username: string): Promise<Book[]> {
    const books = await this.booksModel.find();
    const booksArray = []
    books.forEach((book) => {
      if(book.username === username) booksArray.push(book)
    })

    return booksArray
  }

  async getOneById(id: string, username: string): Promise<Book> {
    const book = await this.bookPermission(id, username)
    return book
  }

  async create(book: CreateBookDto, username: string): Promise<object> {
    const { name, price } = book
    await this.booksModel.create({ name, price, username })
    return { message: 'Livro criado com sucesso' }
  }

  async update(id: string, book: CreateBookDto, username: string): Promise<object> {
    const { name, price } = book
    await this.bookPermission(id, username)
    await this.booksModel.findByIdAndUpdate(id, { name, price })
    return { message: `book ${ book.name } atualizado`}
  }

  async destroy(id: string, username: string) {
    await this.bookPermission(id, username)
    await this.booksModel.findByIdAndDelete(id)
  }
}