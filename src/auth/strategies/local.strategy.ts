import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(user: string, senha: string) {
    console.log(`1 - ${user}`)
    const usuario = await this.authService.validateUser(user, senha)
    if(!user) throw new UnauthorizedException('Usuario ou senha invalidos')
    return usuario
  }
}