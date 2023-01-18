import { Disclosure } from '@headlessui/react';
import { Bars3CenterLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { GitHubLink } from './GitHubLink';
import { DisclosureRenderPropArg } from './Header';
import { LogoImage } from './LogoImage';
import { MobileNav } from './MobileNav';
import { Nav } from './Nav';
import { NavMenu } from './NavMenu';
import { ThemeSelector } from './ThemeSelector';

export interface NavbarProps {
  disclosureRenderPropArg: DisclosureRenderPropArg;
  className?: string;
}

export function Navbar({
  disclosureRenderPropArg: { open, close },
  className,
}: NavbarProps) {
  return (
    <div className={className}>
      <div className="relative flex h-14 w-full items-center sm:h-16">
        {/* Mobile menu button */}
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50">
            <span className="sr-only">Open main menu</span>
            {open ? (
              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3CenterLeftIcon
                className="block h-6 w-6"
                aria-hidden="true"
              />
            )}
          </Disclosure.Button>
        </div>

        <div className="flex w-full items-center justify-center sm:justify-start">
          <NavLink to="/" className="flex items-center">
            <LogoImage className="h-10 w-10 lg:mr-2" />
            <span className="hidden font-display text-3xl font-bold lg:inline">
              Jason Ruesch
            </span>
          </NavLink>
          <Nav className="mx-8 hidden sm:block" />
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center">
          <ThemeSelector />
          <GitHubLink />
          <NavMenu className="hidden sm:block" />
        </div>
      </div>

      <Disclosure.Panel as="nav" className="sm:hidden" unmount={false}>
        <div className="space-y-1 pt-2 pb-4">
          <MobileNav />
        </div>
      </Disclosure.Panel>
    </div>
  );
}
