export function LoginForm() {
  return (
    <form hx-post="/auth/login" hx-trigger="submit">
      <label>
        Username
        <input type="text" name="username" />
      </label>
      <label>
        Password
        <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
