import { Link } from './link';

export function Footer() {
  return (
    <footer id="footer">
      <ul id="footer-link-list">
        <li id="footer-contact-link">
          <Link hx-get="/contact">contact</Link>
        </li>
        <li id="footer-about-link">
          <Link hx-get="/about">about</Link>
        </li>
        <li id="footer-terms-link">
          <Link hx-get="/terms">terms</Link>
        </li>
        <li id="footer-privacy-link">
          <Link hx-get="/privacy">privacy</Link>
        </li>
      </ul>
    </footer>
  );
}
