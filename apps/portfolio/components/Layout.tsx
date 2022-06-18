import { useRouter } from 'next/router';

import { ProfileImage } from './ProfileImage';

export const Layout = ({ children }) => {
  const { route } = useRouter();
  const isHome = route === '/';

  return (
    <main
      className={`mx-auto flex max-w-screen-sm flex-col items-center justify-start px-4 pt-16 pb-4
      sm:min-h-screen sm:px-6 lg:px-8 ${
        isHome
          ? 'sm-max-h:!flex-row sm-max-h:!justify-start sm:justify-center sm:pt-0'
          : 'sm:pt-20'
      } sm-max-h:!pt-16
    `}
    >
      <ProfileImage
        isHome={isHome}
        className="mb-4 flex-none transition-all duration-500"
      />

      {children}
    </main>
  );
};

export default Layout;
