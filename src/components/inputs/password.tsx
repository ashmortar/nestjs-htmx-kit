import { Input, TypedInputProps } from './input';

export function PasswordInput(props: TypedInputProps) {
  return (
    <Input
      type="password"
      name="password"
      label={props.t('forms.password.label')}
      title={props.t('forms.password.title')}
      placeholder={props.t('forms.password.placeholder')}
      required
      value={props.value}
      message={props.message}
      error={props.error}
      success={props.success}
      oob={props.oob}
    />
  );
}

export function ConfirmPasswordInput(props: TypedInputProps) {
  return (
    <Input
      type="password"
      name="confirm-password"
      label={props.t('forms.confirm-password.label')}
      title={props.t('forms.confirm-password.title')}
      placeholder={props.t('forms.confirm-password.placeholder')}
      required
      value={props.value}
      message={props.message}
      error={props.error}
      success={props.success}
      oob={props.oob}
    />
  );
}
