import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/users/interfaces/users.interface";
import { CreateUserDto } from "./dto/user-create.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<object> {
    return await this.usersService.create(user)
  }

  @Post('/login')
  async login(@Body() user: User): Promise<object> {
    return await this.usersService.login(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:user')
  async test(@Param() params, @Request() req): Promise<User> {
    console.log(req.user)
    return this.usersService.getUserByUsername(params.user)
  }
}