import { forwardRef, Ref } from 'react';
import Link from 'next/link';
import { eventBus } from '@jasonruesch/shared/utils';

export const NavLink = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ to, ...props }: any, ref: Ref<HTMLAnchorElement>) => {
    const intendToNavigate = (to: string) => {
      eventBus.dispatch('intendToNavigate', { to });
    };

    return (
      <Link
        ref={ref}
        href={to}
        {...props}
        onMouseOver={() => intendToNavigate(to)}
        onTouchStart={() => intendToNavigate(to)}
      />
    );
  }
);
