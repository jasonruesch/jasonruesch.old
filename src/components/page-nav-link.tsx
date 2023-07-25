import { forwardRef, useCallback } from 'react';
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom';

import { getPage, navigateEventChannel } from '@/lib';

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
    const { pathname } = useLocation();
    const page = getPage(to);

    const handleMouseOver = useCallback(() => {
      navigateEventChannel.emit('onWillNavigate', {
        page,
        currentPathname: pathname,
      });
    }, [page, pathname]);

    return (
      <NavLink
        ref={forwardedRef}
        {...props}
        to={to}
        onMouseOver={handleMouseOver}
        onTouchStart={handleMouseOver}
      >
        {props.children}
      </NavLink>
    );
  }
);
