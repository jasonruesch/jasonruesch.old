import clsx from 'clsx';
import Link from 'next/link';
import { GitHubLink } from './GitHubLink';
import { LogoImage } from './LogoImage';
import { Nav } from './Nav';
import { NavMenu } from './NavMenu';
import { ThemeSelector } from './ThemeSelector';

export interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <div className={clsx('flex w-full items-center', className)}>
      <Link href="/">
        <a className="flex items-center">
          <LogoImage className="h-10 w-10 lg:mr-2" />
          <span className="hidden font-display text-3xl font-bold lg:inline">
            Jason Ruesch
          </span>
        </a>
      </Link>
      <Nav className="mx-8 hidden sm:block" />
      <div className="flex flex-auto items-center justify-end">
        <ThemeSelector />
        <GitHubLink />
        <NavMenu className="hidden md:inline-block" />
      </div>
    </div>
  );
}
