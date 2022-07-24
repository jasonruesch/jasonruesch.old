import clsx from 'clsx';
import { useRouter } from 'next/router';

import { NavItem } from './Navbar';
import { NavLink } from './NavLink';

export function Nav({
  className,
  items,
  onClick,
}: {
  className?: string;
  items: NavItem[];
  onClick?: () => void;
}) {
  const { asPath } = useRouter();

  return (
    <nav className={clsx('h-full md:flex md:space-x-8', className)}>
      {items.map((item) => {
        const isCurrent =
          (item.href === '/' && asPath === '/') ||
          (item.href !== '/' && asPath.startsWith(item.href));

        return (
          <NavLink
            key={item.name}
            href={item.href}
            className={clsx(
              'text-neutral hover:text-on-background hover:border-neutral inline-flex items-center border-b-2 border-transparent px-1 pb-2 pt-3',
              isCurrent ? '!border-primary hover:!border-neutral' : ''
            )}
            isCurrent={isCurrent}
            onClick={onClick}
          >
            {item.name}
          </NavLink>
        );
      })}
    </nav>
  );
}
