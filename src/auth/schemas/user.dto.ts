import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { UserSchema } from '@generated/zod';

export const UserZ = extendApi(UserSchema, {
  title: 'User',
});

export class UserDto extends createZodDto(UserZ) {}
