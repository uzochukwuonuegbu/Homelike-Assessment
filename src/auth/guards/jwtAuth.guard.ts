import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import JWTService from '../../JWTService';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly jwtService: JWTService) { }

  canActivate(context: ExecutionContext): boolean {
    const key: string = this.reflector.get<string>('jwtAuth', context.getHandler());
    if (!key) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization) {
      throw new UnauthorizedException();
    }

    const payload = this.jwtService.decodeToken(authorization.replace('Bearer ', ''));
    if (!payload || !payload[key]) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
