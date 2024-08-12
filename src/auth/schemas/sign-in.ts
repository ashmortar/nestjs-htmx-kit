import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { emailSchema, passwordSchema } from '@core/validation/schemas';

export const SignInZ = extendApi(
  z.object({
    email: emailSchema,
    password: passwordSchema,
  }),
  {
    title: 'Sign In',
    description: 'post email and password to sign in',
  },
);

export class SignInDto extends createZodDto(SignInZ) {}
