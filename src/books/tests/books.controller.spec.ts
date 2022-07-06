import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookDto } from '../dto/create-books.dto';
import { BooksController } from '../books.controller';
import { BooksService } from '../book.service';

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [{
        provide: BooksService,
        useValue: {
          verifyBookById: jest.fn(),
          bookPermission: jest.fn(),
          getAll: jest.fn(),
          getOneById: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
          destroy: jest.fn()
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

  /* describe('create', () => {
    it('Cadastro de usuario feito com sucesso', async () => {
      // const body: CreateBookDto = { username: 'guicouto', password: 'teste123'} 
      const result = await BooksController.create(body)

      expect(result).toHaveProperty('message')
      expect(result).toMatchObject({ message: `Username guicouto criado com sucesso `})
      expect(usersService.create).toHaveBeenCalledTimes(1)
      expect(usersService.create).toHaveBeenCalledWith(body)
    })

    it('Deve lançar uma exceção', () => {
      const body: CreateBookDto = { username: 'guicouto', password: 'teste123'} 

      jest.spyOn(usersService, 'create').mockRejectedValueOnce(new Error())

      expect(BooksController.create(body)).rejects.toThrowError()
    })
    
  })*/
});