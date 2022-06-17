import { useRouter } from 'next/router';

import { ProfileImage } from './ProfileImage';

export const Layout = ({ children }) => {
  const { route } = useRouter();
  const isHome = route === '/';

  return (
    <main
      className={`mx-auto flex max-w-screen-sm flex-col items-center justify-center px-4 pt-16 pb-4 sm:px-6 lg:px-8 ${
        isHome ? 'min-h-screen' : 'pt-16'
      }`}
    >
      <ProfileImage isHome={isHome} className="mb-4" />

      {children}
    </main>
  );
};

export default Layout;
