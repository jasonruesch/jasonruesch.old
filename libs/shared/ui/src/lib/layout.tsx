import { ReactNode } from 'react';

export function Layout({ children }: { children?: ReactNode }) {
  return <div className="h-full">{children}</div>;
}

export default Layout;
