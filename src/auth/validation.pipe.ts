import { ValidationPipe, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class InputValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
    });
    this.exceptionFactory = (errors: ValidationError[]) => {
      const errorList = errors.map(error => `Invalid value for ${error.property}`);
      return new BadRequestException(errorList, 'Validation failed');
    };
  }
}
