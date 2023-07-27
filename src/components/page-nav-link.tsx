import { MouseEvent, forwardRef, useCallback } from 'react';
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom';

import { duration, getPage, navigateEventChannel } from '@/lib';

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
        pathname: pathname,
      });
    }, [page, pathname]);

    const handleClick = useCallback(
      (e: MouseEvent<HTMLAnchorElement>) => {
        if (to === pathname) {
          return;
        }

        navigateEventChannel.emit('onNavigateStart');

        // End navigation after a delay to allow animations to complete
        setTimeout(() => {
          navigateEventChannel.emit('onNavigateEnd');
        }, duration * 1000);
      },
      [to, pathname]
    );

    return (
      <NavLink
        ref={forwardedRef}
        {...props}
        to={to}
        end={props.end || to === '/'}
        onMouseOverCapture={handleMouseOver}
        onTouchStartCapture={handleMouseOver}
        onClickCapture={handleClick}
      >
        {props.children}
      </NavLink>
    );
  }
);
