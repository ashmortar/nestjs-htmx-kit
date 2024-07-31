import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const passwordSchema = z.string().min(8).max(9);

export const PasswordZ = extendApi(
  z.object({
    password: passwordSchema,
  }),
  {
    title: 'Password',
    description: 'Password validation',
  },
);

export class PasswordDto extends createZodDto(PasswordZ) {}

export const PasswordResponseZ = extendApi(
  z.object({
    success: z.boolean(),
    value: z.string(),
  }),
  {
    title: 'Password Validation Response',
    description:
      'success/failure of password validation and the corresponding error message',
  },
);

export class PasswordResponseDto extends createZodDto(PasswordResponseZ) {}
