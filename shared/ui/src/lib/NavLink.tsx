import { eventBus } from '@jasonruesch/shared/utils';
import { forwardRef, Ref } from 'react';
import { NavLinkProps, NavLink as RouterNavLink, To } from 'react-router-dom';

export const NavLink = forwardRef(
  ({ to, ...props }: NavLinkProps, ref: Ref<HTMLAnchorElement>) => {
    const intendToNavigate = (to: To) => {
      eventBus.dispatch('intendToNavigate', {
        to: to as string,
        y: window.scrollY,
      });
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
