import { forwardRef } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { PagePath, eventBus, pages } from 'src/lib';

interface CustomNavLinkProps {
  to: PagePath;
}

export type PageNavLinkProps = CustomNavLinkProps &
  Omit<NavLinkProps, 'to'> &
  React.RefAttributes<HTMLAnchorElement>;

export const PageNavLink = forwardRef(
  (
    { to, ...props }: PageNavLinkProps,
    forwardedRef: React.ForwardedRef<HTMLAnchorElement>
  ) => {
    return (
      <NavLink
        ref={forwardedRef}
        {...props}
        to={to}
        onMouseOver={() =>
          eventBus.dispatch('willNavigate', { page: pages.get(to) })
        }
        onTouchStart={() =>
          eventBus.dispatch('willNavigate', { page: pages.get(to) })
        }
      >
        {props.children}
      </NavLink>
    );
  }
);
