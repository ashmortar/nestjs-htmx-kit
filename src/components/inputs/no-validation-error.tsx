export function NoValidationError(props: { name: string; oob?: boolean }) {
  return (
    <div
      id={`${props.name}-error`}
      class="invisible"
      hx-swap-oob={props.oob ? 'true' : undefined}
    >
      <small>_</small>
    </div>
  );
}
