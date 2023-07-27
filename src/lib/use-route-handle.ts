import { useMatches } from 'react-router-dom';

export interface RouteHandle {
  transparent?: boolean;
}

export const useRouteHandle = (pathname: string) => {
  return (
    (useMatches().find(({ pathname: path }) => path === pathname)
      ?.handle as RouteHandle) ?? {}
  );
};
