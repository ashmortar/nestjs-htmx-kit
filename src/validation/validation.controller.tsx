import { Body, Controller } from '@nestjs/common';
import { EmailDto, PasswordDto } from './schemas';
import { SuccessMessage } from '@core/components';
import { Form } from '@core/htmx/htmx.decorator';

@Controller('validation')
export class ValidationController {
  @Form({
    route: '/email',
    description: 'returns an empty error div or a div with an error message',
    example: (
      <SuccessMessage name="email" oob>
        email is valid
      </SuccessMessage>
    ),
  })
  async email(@Body() _: EmailDto): Promise<string> {
    return (
      <SuccessMessage name="email" oob>
        email is valid
      </SuccessMessage>
    );
  }

  @Form({
    route: '/password',
    description: 'returns an empty error div r a div with an error message',
    example: (
      <SuccessMessage name="password" oob>
        password is valid
      </SuccessMessage>
    ),
  })
  async password(@Body() _: PasswordDto): Promise<string> {
    return (
      <SuccessMessage name="password" oob>
        password is valid
      </SuccessMessage>
    );
  }
}
