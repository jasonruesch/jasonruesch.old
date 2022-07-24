import { Disclosure } from '@headlessui/react';
import { Link as ScrollLink } from 'react-scroll';

import { NavItem } from './Navbar';

export function MobileScrollNav({ items }: { items: NavItem[] }) {
  return (
    <>
      {items.map((item) => (
        <Disclosure.Button
          key={item.name}
          as={ScrollLink}
          to={item.href.replace('#', '')}
          offset={-128}
          spy
          hashSpy
          isDynamic
          className="text-neutral hover:text-on-background hover:border-neutral block cursor-pointer border-l-4 border-transparent py-2 pl-3 pr-4"
          activeClass="!border-secondary hover:!border-neutral"
        >
          {item.name}
        </Disclosure.Button>
      ))}
    </>
  );
}
