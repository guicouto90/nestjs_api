import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log(`2 - ${username}`)
    const user = await this.usersService.getUserByUsername(username)
    if(user && user.password === password) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: any) {
    const { _id, username } = user._doc
    const payload = { username: username, sub: _id };
    console.log(payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}