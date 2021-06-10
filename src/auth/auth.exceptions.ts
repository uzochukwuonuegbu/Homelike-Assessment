// tslint:disable: max-classes-per-file
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor() { super('UserAlreadyExists', HttpStatus.BAD_REQUEST); }
}

export class UserNotFoundException extends HttpException {
  constructor() { super('UserNotFoundException', HttpStatus.BAD_REQUEST); }
}

export class InvalidCredentialsException extends HttpException {
  constructor() { super('InvalidCredentials', HttpStatus.BAD_REQUEST); }
}

export class MissingPermissionsException extends HttpException {
  constructor() { super('MissingPermissions', HttpStatus.UNAUTHORIZED); }
}
