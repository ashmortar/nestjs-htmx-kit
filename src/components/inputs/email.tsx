import { Input, TypedInputProps } from './input';

export function EmailInput(props: TypedInputProps) {
  return (
    <Input
      type="email"
      name="email"
      label={props.label}
      value={props.value}
      title={props.title}
      placeholder={props.placeholder ?? 'name@example.com'}
      required
    />
  );
}
