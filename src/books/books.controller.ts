import { Body, Controller, Delete, Get, HttpCode, Injectable, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { Book } from "./interfaces/books.interface";
import { BooksService } from "./book.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateBookDto } from "./dto/create-books.dto";

@Controller('books')//URL
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(private booksService: BooksService) { }

  @Get()
  async getAll(@Request() req): Promise<Book[]> {
    return await this.booksService.getAll(req.user.username)
  }

  @Get('/:id')
  async getOne(@Param() params, @Request() req): Promise<Book> {
    return await this.booksService.getOneById(params.id, req.user.username)
  }

  @Post()
  async create(@Body() book: CreateBookDto, @Request() req): Promise<object> {
    console.log(req.body)
    return await this.booksService.create(book, req.user.username)
  }

  @Put('/:id')
  async update(@Param() params, @Body() books: CreateBookDto, @Request() req): Promise<object> {
    return await this.booksService.update(params.id, books, req.user.username)
  }

  @Delete('/:id')
  @HttpCode(204)
  async destroy(@Param() params, @Request() req) {
    await this.booksService.destroy(params.id, req.user.username)
  }
}