import { useRouter } from 'next/router';

import { ProfileImage } from './ProfileImage';

export const Layout = ({ children }) => {
  const { route } = useRouter();
  const isHome = route === '/';

  return (
    <main
      className={`mx-auto flex max-w-screen-sm flex-col items-center justify-center p-4 sm-max-h:pt-20 sm:px-6 lg:px-8 ${
        isHome ? 'h-screen sm-max-h:h-auto' : 'pt-20'
      }`}
    >
      <ProfileImage isHome={isHome} className="mb-4" />

      {children}
    </main>
  );
};

export default Layout;
