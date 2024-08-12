import type { TypedInputProps } from './input';
import { Input } from './input';

export function EmailInput(props: TypedInputProps) {
  return (
    <Input
      type="email"
      name="email"
      label={props.t('forms.email.label')}
      title={props.t('forms.email.title')}
      placeholder={props.t('forms.email.placeholder')}
      value={props.value}
      required
      message={props.message}
      error={props.error}
      success={props.success}
      oob={props.oob}
    />
  );
}
