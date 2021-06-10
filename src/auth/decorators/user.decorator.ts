import { RequestWithUser } from '../types';
import { createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data: unknown, req: RequestWithUser) => {
  return req.user;
});
