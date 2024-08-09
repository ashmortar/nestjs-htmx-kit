import { ZodIssue } from 'zod';
import { ClassName } from '../types';
import { Translations } from '@core/i18n/i18n.utils';

export type InputProps = ClassName & {
  type: JSX.HtmlInputTag['type'];
  'hx-post'?: string;
  name: string;
  message?: string;
  error?: ZodIssue;
  success?: boolean;
  class?: string;
  required?: boolean;
  value?: string;
  label: string;
  placeholder?: string;
  title?: string;
  oob?: boolean;
};

export type TypedInputProps = Pick<
  InputProps,
  'message' | 'error' | 'success' | 'class' | 'required' | 'value'
> & {
  oob?: boolean;
} & Translations;

export type InputVariant = 'default' | 'success' | 'error';

const LabelStyles: Record<InputVariant, string> = {
  default: 'text-gray-900 dark:text-white',
  success: 'text-green-700 dark:text-green-500',
  error: 'text-red-700 dark:text-red-500',
};
const InputStyles: Record<InputVariant, string> = {
  default:
    'bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
  success:
    'bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-500',
  error:
    'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',
};
const MessageStyles: Record<InputVariant, string> = {
  default: 'text-gray-500 dark:text-gray-400',
  success: 'text-green-600 dark:text-green-500',
  error: 'text-red-600 dark:text-red-500',
};

export function Input(props: InputProps) {
  const variant: InputVariant = props.error
    ? 'error'
    : props.success
      ? 'success'
      : 'default';
  const id = `${props.name}-input`;

  return (
    <div class="mb-6" id={id} hx-swap-oob={props.oob ? 'true' : undefined}>
      <label
        for={props.name}
        class={`block mb-2 text-sm font-medium ${LabelStyles[variant]}`}
        safe
      >
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        hx-post={props['hx-post'] ?? `/validation/${props.name}`}
        class={`text-sm rounded-lg block w-full p-2.5 ${InputStyles[variant]} ${props.class}`}
        hx-target={`#${id}`}
        required={props.required}
        value={props.value}
        placeholder={props.placeholder}
        title={props.title}
      />
      <p class={`mt-2 text-sm ${MessageStyles[variant]}`}>
        {props.error?.message ?? props.message ?? ''}
      </p>
    </div>
  );
}
