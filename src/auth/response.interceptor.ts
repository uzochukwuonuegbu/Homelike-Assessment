import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const customResponse = this.reflector.get<boolean>('customResponse', context.getHandler()) || false;
    if (customResponse) {
      return next.handle();
    }
    return next.handle().pipe(map(data => ({ success: true, data })));
  }
}
