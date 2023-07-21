import { forwardRef } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { eventBus, pages } from 'src/lib';

interface CustomNavLinkProps {
  to: string;
}

export type PageNavLinkProps = CustomNavLinkProps &
  Omit<NavLinkProps, 'to'> &
  React.RefAttributes<HTMLAnchorElement>;

export const PageNavLink = forwardRef(
  (
    { to, ...props }: PageNavLinkProps,
    forwardedRef: React.ForwardedRef<HTMLAnchorElement>
  ) => {
    const page = to.startsWith('/easter-egg')
      ? pages.get('/easter-egg')
      : pages.get(to);

    return (
      <NavLink
        ref={forwardedRef}
        {...props}
        to={to}
        onMouseOver={() => eventBus.dispatch('willNavigate', { page })}
        onTouchStart={() => eventBus.dispatch('willNavigate', { page })}
      >
        {props.children}
      </NavLink>
    );
  }
);
