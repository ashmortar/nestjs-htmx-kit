import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { emailSchema, passwordSchema } from '@core/validation/schemas';
import { z } from 'zod';

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
