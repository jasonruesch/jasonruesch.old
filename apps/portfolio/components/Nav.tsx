import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export interface NavProps {
  className?: string;
}

export function Nav({ className }: NavProps) {
  const { asPath } = useRouter();

  const isCurrentRoute = (href: string): boolean => {
    return (
      (href === '/' && asPath === '/') ||
      (href !== '/' && asPath.startsWith(href))
    );
  };

  return (
    <nav className={clsx('space-x-8', className)}>
      {navItems.map(({ name, href }) => (
        <Link href={href} key={name}>
          <a
            className={clsx(
              'inline-flex items-center border-b-2 px-1 pb-2 pt-3 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50',
              isCurrentRoute(href)
                ? 'border-cyan-500 hover:border-neutral-500 dark:border-violet-400 dark:hover:border-neutral-400'
                : 'border-transparent hover:border-neutral-500 dark:hover:border-neutral-400'
            )}
          >
            {name}
          </a>
        </Link>
      ))}
    </nav>
  );
}
