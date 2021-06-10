import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserDataService } from './user';
import { InvalidCredentialsException } from './auth.exceptions';
import { omit } from './util';
import {generalConfig} from '../config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userDataService: UserDataService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: generalConfig.jwtSecret,
    });
  }

  async validate(payload: any) {
    if (!payload.id) {
      throw new InvalidCredentialsException();
    }
    const user = await this.userDataService.getUserById(payload.id);
    return omit(user);
  }
}
