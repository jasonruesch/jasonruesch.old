import Link from 'next/link';
import { forwardRef, MutableRefObject } from 'react';

const NavLink = forwardRef(
  (
    {
      className,
      href,
      children,
      isCurrent,
    }: {
      className?: string;
      href: string;
      children: React.ReactNode;
      isCurrent?: boolean;
    },
    ref: MutableRefObject<HTMLAnchorElement>
  ) => {
    return (
      <Link href={href}>
        <a
          ref={ref}
          className={className}
          aria-current={isCurrent ? 'page' : undefined}
        >
          {children}
        </a>
      </Link>
    );
  }
);
NavLink.displayName = 'MyLink';

export default NavLink;
