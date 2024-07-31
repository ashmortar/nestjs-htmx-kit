import { Input, TypedInputProps } from './input';

export function PasswordInput(props: TypedInputProps) {
  return (
    <Input
      type="password"
      name="password"
      label={props.label}
      value={props.value}
      title={props.title}
      placeholder={props.placeholder ?? ''}
      required
    />
  );
}
