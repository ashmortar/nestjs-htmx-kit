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
        safeParse: jest.fn().mockReturnValue({ success: true, data: 'data' }),
      };
      const metadata = {
        metatype: {
          zodSchema: schema,
        },
      };
      const value = 'value';
      pipe.transform(value, metadata as unknown as ArgumentMetadata);
      expect(schema.safeParse).toHaveBeenCalledWith(value);
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
