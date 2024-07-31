import { ZodIssue } from 'zod';

export function ValidationError(props: { issue: ZodIssue }) {
  return (
    <div
      id={`${props.issue.path?.toString?.()}-error`}
      hx-swap-oob="true"
      class="field-error-container"
    >
      <small class="field-error" safe>
        {props.issue.message}
      </small>
    </div>
  );
}
