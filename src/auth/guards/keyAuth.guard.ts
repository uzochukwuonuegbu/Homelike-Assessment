import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class KeyAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const key = this.reflector.get<string[]>('keyAuth', context.getHandler());
    if (!key) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const { query = {} } = request;
    if (!query || query.key !== key) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
