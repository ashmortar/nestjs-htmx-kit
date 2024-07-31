import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const emailSchema = z.string().email();

export const EmailZ = extendApi(
  z.object({
    email: emailSchema,
  }),
  {
    title: 'Email',
    description: 'Email validation',
  },
);

export class EmailDto extends createZodDto(EmailZ) {}

export const EmailResponseZ = extendApi(
  z.object({
    success: z.boolean(),
    value: z.string(),
  }),
  {
    title: 'Email Validation Response',
    description:
      'success/failure of email validation and the corresponding error message',
  },
);

export class EmailResponseDto extends createZodDto(EmailResponseZ) {}
