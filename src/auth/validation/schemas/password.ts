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

export const ConfirmPasswordZ = extendApi(
  z
    .object({
      password: passwordSchema,
      'confirm-password': passwordSchema,
    })
    .refine((data) => data.password === data['confirm-password'], {
      message: "Passwords don't match",
      path: ['confirm-password'], // path of error
    }),
  {
    title: 'Confirm Password',
    description: 'Confirm Password validation',
  },
);

export class ConfirmPasswordDto extends createZodDto(ConfirmPasswordZ) {}
