import type { ZodDtoStatic } from '@anatine/zod-nestjs';
import type { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ZodError } from 'zod';

export class SchemaValidationError<Input = any> extends ZodError<Input> {
  value: Input;
  constructor(error: ZodError<Input>, value: Input) {
    super(error.issues);
    this.value = value;
  }
}

export class ZodValidationPipe implements PipeTransform {
  constructor() {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const schema = (metadata?.metatype as ZodDtoStatic).zodSchema;
    if (schema) {
      const result = schema.safeParse(value);
      if (result.success) {
        return result.data;
      } else {
        throw new SchemaValidationError(result.error, value);
      }
    }
    return value;
  }
}
