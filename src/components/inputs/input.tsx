import { ClassName } from '../types';
import { NoValidationError } from './no-validation-error';

export type InputProps = ClassName & {
  type: JSX.HtmlInputTag['type'];
  name: string;
  required?: boolean;
  value?: string;
} & (
    | { label: string; placeholder?: string; title?: string }
    | { placeholder: string; title?: string; label?: string }
    | { title: string; placeholder?: string; label?: string }
  );

export type TypedInputProps = Pick<
  InputProps,
  'title' | 'label' | 'placeholder'
> & {
  value?: string;
};

export function Input(props: InputProps) {
  return (
    <div class={props.class ?? 'input-container'}>
      {props.label ? (
        <label class="label" for={props.name} safe>
          {props.label}
        </label>
      ) : null}
      <input
        class="input"
        hx-post={`/validation/${props.name}`}
        type={props.type}
        name={props.name}
        required={props.required}
        value={props.value}
        placeholder={props.placeholder}
        title={props.title}
      />
      <NoValidationError name={props.name} />
    </div>
  );
}
