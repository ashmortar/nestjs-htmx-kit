import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { emailSchema } from './email';
import { passwordSchema } from './password';
import { CredentialSchema, PiiSchema, UserSchema } from '@generated/zod';

export const SignInFormName = 'sign-in';

export const SignInResultSchema = z.object({
  [SignInFormName]: CredentialSchema.extend({
    user: UserSchema.extend({
      pii: z.array(PiiSchema),
    }),
  }),
});

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
