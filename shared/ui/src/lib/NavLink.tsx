import { forwardRef, Ref } from 'react';
import { NavLink as RouterNavLink, NavLinkProps } from 'react-router-dom';
import { eventBus } from '@jasonruesch/shared/utils';

// required for react-router-dom < 6.0.0
// see https://github.com/ReactTraining/react-router/issues/6056#issuecomment-435524678
export const NavLink = forwardRef(
  ({ to, ...props }: NavLinkProps, ref: Ref<HTMLAnchorElement>) => {
    const intendToNavigate = (to: string) => {
      eventBus.dispatch('intendToNavigate', { to });
    };

    return (
      <RouterNavLink
        ref={ref}
        to={to}
        {...props}
        onMouseOver={() => intendToNavigate(to.toString())}
      />
    );
  }
);
