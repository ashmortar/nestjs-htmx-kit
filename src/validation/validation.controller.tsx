import { Body, Controller, Post } from '@nestjs/common';
import { EmailDto, PasswordDto } from './schemas';
import { NoValidationError } from '@core/components';
import { ApiHtmlPartialResponse } from '@core/htmx/htmx.utils';

@Controller('validation')
export class ValidationController {
  @ApiHtmlPartialResponse({
    status: 201,
    description: 'returns an empty error div or a div with an error message',
    example: <NoValidationError name="email" />,
  })
  @Post('email')
  async email(@Body() _: EmailDto): Promise<string> {
    return <NoValidationError name="email" oob />;
  }

  @ApiHtmlPartialResponse({
    status: 201,
    description: 'returns an empty error div or a div with an error message',
    example: <NoValidationError name="password" oob />,
  })
  @Post('password')
  async password(@Body() _: PasswordDto): Promise<string> {
    return <NoValidationError name="password" oob />;
  }
}
