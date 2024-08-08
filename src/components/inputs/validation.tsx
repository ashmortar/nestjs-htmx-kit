import { ZodIssue } from 'zod';

export function Message({
  name,
  oob,
  children,
  safe,
}: Html.PropsWithChildren<{ name: string; oob?: boolean; safe?: boolean }>) {
  /* <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p> */
  return (
    <p
      id={`${name}-helper-text`}
      class="mt-2 text-sm text-gray-500 dark:text-gray-400"
      hx-swap-oob={oob ? 'true' : undefined}
      safe={safe}
    >
      {children}
    </p>
  );
}

export function SuccessMessage(
  props: Html.PropsWithChildren<{
    name: string;
    oob?: boolean;
    safe?: boolean;
  }>,
) {
  // <p class="mt-2 text-sm text-green-600 dark:text-green-500"><span class="font-medium">Well done!</span> Some success message.</p>
  return (
    <p
      id={`${props.name}-helper-text`}
      class="mt-2 text-sm text-green-600 dark:text-green-500"
      hx-swap-oob={props.oob ? 'true' : undefined}
      safe={props.safe}
    >
      {props.children}
    </p>
  );
}

export function ErrorMessage(props: {
  name: string;
  error: ZodIssue;
  oob?: boolean;
  safe?: boolean;
}) {
  // <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> Some error message.</p>
  return (
    <p
      id={`${props.name}-helper-text`}
      class="mt-2 text-sm text-red-600 dark:text-red-500"
      hx-swap-oob={props.oob ? 'true' : undefined}
      safe={props.safe}
    >
      {props.error.message}
    </p>
  );
}
