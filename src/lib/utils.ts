export const isActive = (path: string, pathname: string): boolean => {
  return (
    (path === '/' && pathname === '/') ||
    (path !== '/' && pathname.startsWith(path))
  );
};
