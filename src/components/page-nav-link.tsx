import { forwardRef, useCallback } from 'react';
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
    { to, onMouseOver, onTouchStart, onClick, ...props }: PageNavLinkProps,
    forwardedRef: React.ForwardedRef<HTMLAnchorElement>
  ) => {
    const { pathname } = useLocation();
    const page = getPage(to);

    const debugLog = useCallback(
      (name: string) => {
        console.debug(`[PageNavLink] ${name}`, { to, pathname });
      },
      [to, pathname]
    );

    const handleMouseOver = useCallback(
      (
        event:
          | React.MouseEvent<HTMLAnchorElement>
          | React.TouchEvent<HTMLAnchorElement>
      ) => {
        if (event instanceof TouchEvent) {
          onTouchStart?.(event as React.TouchEvent<HTMLAnchorElement>);
        } else {
          onMouseOver?.(event as React.MouseEvent<HTMLAnchorElement>);
        }

        debugLog('handleMouseOver');

        navigateEventChannel.emit('onWillNavigate', {
          page,
          pathname: pathname,
        });
      },
      [page, pathname, onMouseOver, onTouchStart, debugLog]
    );

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);

        if (to === pathname) {
          return;
        }

        debugLog('handleClick: onNavigateStart');

        navigateEventChannel.emit('onNavigateStart');

        // End navigation after a delay to allow animations to complete
        setTimeout(() => {
          debugLog('handleClick: onNavigateEnd');

          navigateEventChannel.emit('onNavigateEnd');
        }, duration * 1000);
      },
      [to, pathname, onClick, debugLog]
    );

    return (
      <NavLink
        ref={forwardedRef}
        {...props}
        to={to}
        end={props.end || to === '/'}
        onMouseOver={handleMouseOver}
        onTouchStart={handleMouseOver}
        onClick={handleClick}
      >
        {props.children}
      </NavLink>
    );
  }
);
