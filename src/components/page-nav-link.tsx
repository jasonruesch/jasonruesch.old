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
    { to, ...props }: PageNavLinkProps,
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

    const handleMouseOver = useCallback(() => {
      debugLog('handleMouseOver');

      navigateEventChannel.emit('onWillNavigate', {
        page,
        pathname: pathname,
      });
    }, [debugLog, page, pathname]);

    const handleClick = useCallback(() => {
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
    }, [debugLog, to, pathname]);

    return (
      <NavLink
        ref={forwardedRef}
        {...props}
        to={to}
        end={props.end || to === '/'}
        onMouseOverCapture={handleMouseOver}
        onTouchStartCapture={handleMouseOver}
        onClickCapture={handleClick}
        onTouchEndCapture={handleClick}
      >
        {props.children}
      </NavLink>
    );
  }
);
