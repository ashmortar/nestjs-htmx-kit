import { ArgumentMetadata } from '@nestjs/common';
import { ZodValidationPipe } from './zod.pipe';

describe('ZodValidationPipe', () => {
  it('should be defined', () => {
    expect(new ZodValidationPipe()).toBeDefined();
  });
  describe('transform', () => {
    it('should transform a value given a schema', () => {
      const pipe = new ZodValidationPipe();
      const schema = {
        parse: jest.fn(),
      };
      const metadata = {
        metatype: {
          zodSchema: schema,
        },
      };
      const value = 'value';
      pipe.transform(value, metadata as unknown as ArgumentMetadata);
      expect(schema.parse).toHaveBeenCalledWith(value);
    });

    it('should return the value if no schema is provided', () => {
      const pipe = new ZodValidationPipe();
      const metadata = {
        metatype: {},
      };
      const value = 'value';
      expect(
        pipe.transform(value, metadata as unknown as ArgumentMetadata),
      ).toBe(value);
    });
  });
});
