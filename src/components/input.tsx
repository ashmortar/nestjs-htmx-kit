import { ClassName } from './types';

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

export function Input(props: InputProps) {
  const errorId = `${props.name}-error`;
  return (
    <div class={props.class}>
      {props.label ?? <label for={props.name}>{props.label}</label>}
      <input
        type={props.type}
        name={props.name}
        required={props.required}
        value={props.value}
        placeholder={props.placeholder}
        title={props.title}
      />
      <div id={errorId} />
    </div>
  );
}
