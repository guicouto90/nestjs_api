import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookDto } from '../dto/create-books.dto';
import { BooksController } from '../books.controller';
import { BooksService } from '../book.service';

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

  const getList: CreateBookDto[] = [
    { name: 'Harry Potter', price: 39.50 },
    { name: 'Senhor dos aneis', price: 35.50 }
  ]
  

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [{
        provide: BooksService,
        useValue: {
          getAll: jest.fn().mockResolvedValue(getList),
          getOneById: jest.fn().mockResolvedValue(getList[0]),
          create: jest.fn().mockResolvedValue({ message: 'Livro criado com sucesso' }),
          update: jest.fn().mockResolvedValue({ message: 'Livro Jogos Vorazes criado com sucesso' }),
          destroy: jest.fn().mockResolvedValue(undefined)
        }
      }],
    }).compile();

    booksController = app.get<BooksController>(BooksController);
    booksService = app.get<BooksService>(BooksService);
  });

  it('should be defined"', () => {
    expect(booksController).toBeDefined();
    expect(booksService).toBeDefined();
  });

  describe('create', () => {
    it('Cadastro de livros feito com sucesso', async () => {
      const body: CreateBookDto = { name: "Jogos Vorazes", price: 39.50} 
      const req = { user: { username: 'guicouto90'} }
      const result = await booksController.create(body, req)

      expect(result).toHaveProperty('message')
      expect(result).toMatchObject({ message: 'Livro criado com sucesso' })
      expect(booksService.create).toHaveBeenCalledTimes(1)
    })

    it('Deve lançar uma exceção', () => {
      const body: CreateBookDto = { name: "Jogos Vorazes", price: 39.50} 
      const req = { user: { username: 'guicouto90'} }

      jest.spyOn(booksService, 'create').mockRejectedValueOnce(new Error())

      expect(booksController.create(body, req)).rejects.toThrowError()
    })
  })

  describe('update', () => {
    it('Atualizacao de um livro feito com sucesso', async () => {
      const body: CreateBookDto = { name: "Jogos Vorazes", price: 39.50} 
      const req = { user: { username: 'guicouto90'} }
      const result = await booksController.update(1, body, req)

      expect(result).toHaveProperty('message')
      expect(result).toMatchObject({ message: 'Livro Jogos Vorazes criado com sucesso' })
      expect(booksService.update).toHaveBeenCalledTimes(1)
    })

    it('Deve lançar uma exceção', () => {
      const body: CreateBookDto = { name: "Jogos Vorazes", price: 39.50} 
      const req = { user: { username: 'guicouto90'} }

      jest.spyOn(booksService, 'update').mockRejectedValueOnce(new Error())

      expect(booksController.update(1, body, req)).rejects.toThrowError()
    })
  })

  describe('getAll', () => {
    it('Lista livros com sucesso', async () => {
      const req = { user: { username: 'guicouto90'} }
      const result = await booksController.getAll(req)

      expect(result).toMatchObject(getList)
      expect(booksService.getAll).toHaveBeenCalledTimes(1)
    })

    it('Deve lançar uma exceção', () => {
      const req = { user: { username: 'guicouto90'} }

      jest.spyOn(booksService, 'getAll').mockRejectedValueOnce(new Error())

      expect(booksController.getAll(req)).rejects.toThrowError()
    })
  })

  describe('getOneById', () => {
    it('Lista um livro com sucesso', async () => {
      const req = { user: { username: 'guicouto90'} }
      const result = await booksController.getOne(1, req)

      expect(result).toMatchObject(getList[0])
      expect(booksService.getOneById).toHaveBeenCalledTimes(1)
    })

    it('Deve lançar uma exceção', () => {
      const req = { user: { username: 'guicouto90'} }

      jest.spyOn(booksService, 'getOneById').mockRejectedValueOnce(new Error())

      expect(booksController.getOne(1, req)).rejects.toThrowError()
    })
  })

  describe('delete', () => {
    it('Lista um livro com sucesso', async () => {
      const req = { user: { username: 'guicouto90'} }
      const result = await booksController.destroy(1, req)

      expect(result).toBeUndefined()
      expect(booksService.destroy).toHaveBeenCalledTimes(1)
    })

    it('Deve lançar uma exceção', () => {
      const req = { user: { username: 'guicouto90'} }

      jest.spyOn(booksService, 'destroy').mockRejectedValueOnce(new Error())

      expect(booksController.destroy(1, req)).rejects.toThrowError()
    })
  })

});