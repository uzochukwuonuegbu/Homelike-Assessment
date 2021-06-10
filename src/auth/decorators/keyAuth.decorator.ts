import { SetMetadata } from '@nestjs/common';

export const KeyAuth = (key: string) => SetMetadata('keyAuth', key);
