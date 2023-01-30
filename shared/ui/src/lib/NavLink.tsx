import { forwardRef, Ref } from 'react';
import { NavLink as RouterNavLink, NavLinkProps, To } from 'react-router-dom';
import { eventBus } from '@jasonruesch/shared/utils';

export const NavLink = forwardRef(
  ({ to, ...props }: NavLinkProps, ref: Ref<HTMLAnchorElement>) => {
    const intendToNavigate = (to: To) => {
      eventBus.dispatch('intendToNavigate', { to: to as string });
    };

    return (
      <RouterNavLink
        ref={ref}
        to={to}
        {...props}
        onMouseOver={() => intendToNavigate(to)}
        onTouchStart={() => intendToNavigate(to)}
      />
    );
  }
);
