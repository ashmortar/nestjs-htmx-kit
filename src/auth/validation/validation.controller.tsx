import { Body, Controller } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { EmailDto, PasswordDto, ConfirmPasswordDto } from './schemas';
import { Base } from '@core/base/base.controller';
import {
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
} from '@core/components';
import { mockT } from '@core/i18n/i18n.utils';
import { I18nTranslations } from '@generated/i18n';
import { Form } from '@core/htmx/htmx.decorator';

@Controller('validation')
export class ValidationController extends Base {
  constructor(i18nService: I18nService<I18nTranslations>) {
    super(i18nService);
  }

  @Form({
    route: '/email',
    description: 'returns a new input group with error or success message',
    example: <EmailInput t={mockT} message="valid email" success />,
  })
  async email(@Body() { email }: EmailDto): Promise<string> {
    return (
      <EmailInput t={this.t} message="valid email" success value={email} oob />
    );
  }

  @Form({
    route: '/password',
    description: 'returns an empty error div r a div with an error message',
    example: <PasswordInput t={mockT} message="password is valid" success />,
  })
  async password(@Body() { password }: PasswordDto): Promise<string> {
    return (
      <PasswordInput
        t={this.t}
        message="password is valid"
        success
        value={password}
        oob
      />
    );
  }

  @Form({
    route: '/confirm-password',
    description: 'returns an empty error div or a div with an error message',
    example: (
      <ConfirmPasswordInput t={mockT} message="passwords match" success />
    ),
  })
  async confirmPassword(
    @Body() { 'confirm-password': value }: ConfirmPasswordDto,
  ): Promise<string> {
    return (
      <ConfirmPasswordInput
        t={this.t}
        message="passwords match"
        success
        value={value}
        oob
      />
    );
  }
}
