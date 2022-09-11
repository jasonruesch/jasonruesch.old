import Link from 'next/link';

import { Container } from '@/components/Container';

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="transition hover:text-cyan-500 dark:hover:text-violet-400"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  const OuterContainer = Container['Outer'];
  const InnerContainer = Container['Inner'];

  return (
    <footer className="mt-32">
      <OuterContainer>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <InnerContainer>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink href="/about">About</NavLink>
                <NavLink href="/projects">Projects</NavLink>
                <NavLink href="/uses">Uses</NavLink>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Jason Ruesch. All rights
                reserved.
              </p>
            </div>
          </InnerContainer>
        </div>
      </OuterContainer>
    </footer>
  );
}
