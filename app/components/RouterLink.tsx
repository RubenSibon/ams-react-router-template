import type { AnchorHTMLAttributes } from "react";
import { Link } from "react-router";

const externalPattern = /^(https?:|mailto:|tel:|#)/;

export function RouterLink({
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href && !externalPattern.test(href)) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
