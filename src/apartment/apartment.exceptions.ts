// tslint:disable: max-classes-per-file
import { HttpException, HttpStatus } from '@nestjs/common';

export class ApartmentNotFoundException extends HttpException {
  constructor() { super('ApartmentNotFoundException', HttpStatus.BAD_REQUEST); }
}

export class InvalidCredentialsException extends HttpException {
  constructor() { super('InvalidCredentials', HttpStatus.BAD_REQUEST); }
}

export class MissingPermissionsException extends HttpException {
  constructor() { super('MissingPermissions', HttpStatus.UNAUTHORIZED); }
}