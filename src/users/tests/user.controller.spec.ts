import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/user-create.dto';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: {
          create: jest.fn().mockResolvedValue({ message: `Username guicouto criado com sucesso `}),
          getUserByUsername: jest.fn(),
          login: jest.fn(),
          verifyUser: jest.fn()
        }
      }],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  it('should be defined"', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('Cadastro de usuario feito com sucesso', async () => {
      const body: CreateUserDto = { username: 'guicouto', password: 'teste123'} 
      const result = await usersController.create(body)

      expect(result).toHaveProperty('message')
      expect(result).toMatchObject({ message: `Username guicouto criado com sucesso `})
      expect(usersService.create).toHaveBeenCalledTimes(1)
      expect(usersService.create).toHaveBeenCalledWith(body)
    })

    it('Deve lançar uma exceção', () => {
      const body: CreateUserDto = { username: 'guicouto', password: 'teste123'} 

      jest.spyOn(usersService, 'create').mockRejectedValueOnce(new Error())

      expect(usersController.create(body)).rejects.toThrowError()
    })
    
  })
});