import { Link } from '@core/components';

export function AuthLinks() {
  return (
    <div>
      <Link hx-get="/auth/login">Login</Link>
      <span>or</span>
      <Link hx-get="/auth/register">Register</Link>
    </div>
  );
}
