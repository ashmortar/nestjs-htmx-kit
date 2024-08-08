import { ZodIssue } from 'zod';
import { ClassName } from '../types';
import { ErrorMessage, Message, SuccessMessage } from './validation';

export type InputProps = ClassName & {
  type: JSX.HtmlInputTag['type'];
  name: string;
  message?: string;
  error?: ZodIssue;
  success?: boolean;
  class?: string;
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
    <div class="mb-6">
      <label
        for={props.name}
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        safe
      >
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.name}
        name={props.name}
        hx-post={`/validation/${props.name}`}
        class={`block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
          props.class ?? ''
        }`}
        required={props.required}
        value={props.value}
        placeholder={props.placeholder}
        title={props.title}
      />
      {props.error ? (
        <ErrorMessage name={props.name} error={props.error} />
      ) : props.success ? (
        <SuccessMessage name={props.name} />
      ) : (
        <Message name={props.name} safe>
          {props.message}
        </Message>
      )}
    </div>
  );
}
