export function Header(props: { title: string }) {
  return (
    <header>
      <h1 safe>{props.title}</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>
      <div id="profile" hx-get="/auth/profile" hx-trigger="load" />
    </header>
  );
}
