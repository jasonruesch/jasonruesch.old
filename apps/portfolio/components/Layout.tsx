import { useRouter } from 'next/router';

import { ProfileImage } from './ProfileImage';

export const Layout = ({ children }) => {
  const { route } = useRouter();
  const isHome = route === '/';

  return (
    <main
      className={`mx-auto flex min-h-screen max-w-screen-sm flex-col items-center p-4 sm:p-6 lg:p-8 ${
        isHome ? 'justify-center' : 'justify-start !pt-16 sm:!pt-20'
      } sm-max-h:flex-row sm-max-h:!px-4 sm-max-h:!pt-16 sm-max-h:!pb-4`}
    >
      <ProfileImage isHome={isHome} className="mb-4 flex-none sm-max-h:mr-4" />

      {children}
    </main>
  );
};

export default Layout;
