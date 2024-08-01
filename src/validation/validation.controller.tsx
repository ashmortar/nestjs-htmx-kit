import { Body, Controller, Post } from '@nestjs/common';
import { EmailDto, PasswordDto } from './schemas';
import { NoValidationError } from '@core/components';
import { Form } from '@core/htmx/htmx.decorator';

@Controller('validation')
export class ValidationController {
  @Form({
    route: 'email',
    description: 'returns an empty error div or a div with an error message',
    example: <NoValidationError name="email" />,
  })
  async email(@Body() _: EmailDto): Promise<string> {
    return <NoValidationError name="email" oob />;
  }

  @Form({
    route: 'password',
    description: 'returns an empty error div or a div with an error message',
    example: <NoValidationError name="password" oob />,
  })
  async password(@Body() _: PasswordDto): Promise<string> {
    return <NoValidationError name="password" oob />;
  }
}
