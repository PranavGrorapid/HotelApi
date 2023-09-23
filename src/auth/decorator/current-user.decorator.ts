import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/schemas/authSchema';

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext):User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
