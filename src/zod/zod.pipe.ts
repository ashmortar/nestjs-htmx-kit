import { ZodDtoStatic } from '@anatine/zod-nestjs';
import { PipeTransform, ArgumentMetadata } from '@nestjs/common';

export class ZodValidationPipe implements PipeTransform {
  constructor() {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const schema = (metadata?.metatype as ZodDtoStatic).zodSchema;
    if (schema) {
      return schema.parse(value);
    }
    return value;
  }
}
