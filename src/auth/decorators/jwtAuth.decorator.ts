import { SetMetadata } from '@nestjs/common';

export const JwtAuth = (key: string) => SetMetadata('jwtAuth', key);
