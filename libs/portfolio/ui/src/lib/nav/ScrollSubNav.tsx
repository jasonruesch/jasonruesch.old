import clsx from 'clsx';
import { Link as ScrollLink } from 'react-scroll';

import { NavItem } from './Navbar';

export function ScrollSubNav({
  className,
  items,
}: {
  className?: string;
  items: NavItem[];
}) {
  return (
    <nav className={clsx('space-x-8', className)}>
      {items.map((item) => (
        <ScrollLink
          key={item.name}
          to={item.href.replace('#', '')}
          offset={-128}
          spy
          hashSpy
          isDynamic
          className="text-neutral hover:bg-neutral-muted hover:text-on-background inline-flex cursor-pointer items-center rounded-md py-2 px-3 text-sm font-medium"
          activeClass="!bg-secondary-light hover:!bg-neutral-muted !text-black hover:!text-on-background"
        >
          {item.name}
        </ScrollLink>
      ))}
    </nav>
  );
}
