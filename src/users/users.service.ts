import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "src/users/interfaces/users.interface";
import { CreateUserDto } from "./dto/user-create.dto";

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MODEL')
    private userModel: Model<User>
  ){}

  async verifyUser(username: string): Promise<User> {
    console.log(`Verify: ${username}`)
    const user = await this.userModel.findOne({ username })
    if(!user) throw new NotFoundException('Usuario nao encontrado')
    return user
  }

  async create(user: CreateUserDto): Promise<object> {
    const { username, password } = user;
    const users = await this.userModel.find()
    users.forEach((userArray) => { if(userArray.username == username) throw new ConflictException('User ja cadastrado, tente outro')})
    await this.userModel.create({ username, password })
    return { message: `Username ${username} criado com sucesso `}
  }

  async getUserByUsername(user: any): Promise<User> {
    console.log(`3 - ${user}`)
    const selectedUser = await this.verifyUser(user)
    return selectedUser;
  }

  async login(user: User): Promise<object> {
    const { username, password } = user
    const verificar = await this.userModel.findOne({ username })
    if(!verificar || verificar.password !== password) throw new UnauthorizedException('Usuario ou senha invalidos')
    return { message: 'Login efetuado com sucesso' }
  }
}