import { Module } from '@nestjs/common';
import { APP_GUARD, APP_PIPE, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { KeyAuthGuard } from './auth/guards/keyAuth.guard';
import { JwtAuthGuard } from './auth/guards/jwtAuth.guard';
import { AuthModule } from './auth/auth.module';
import { ResponseInterceptor } from './auth/response.interceptor';
import { HttpExceptionFilter } from './auth/httpException.filter';
import JWTService from './JWTService';
import { ApartmentModule } from './apartment/apartment.module';

@Module({
  imports: [
    AuthModule,
    ApartmentModule
  ],
  providers: [
    JWTService,
    { provide: APP_GUARD, useClass: KeyAuthGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
