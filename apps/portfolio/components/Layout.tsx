import { useRouter } from 'next/router';

import { motion } from 'framer-motion';

import { ProfileImage } from './ProfileImage';

export const Layout = ({ children }) => {
  const { route } = useRouter();
  const isHome = route === '/';

  return (
    <main
      className={`relative mx-auto flex max-w-screen-sm flex-col items-center justify-start px-4 pt-16 pb-4
      sm:min-h-screen sm:px-6 lg:px-8 ${
        isHome
          ? 'sm-max-h:!flex-row sm-max-h:!justify-start sm:justify-center sm:pt-0'
          : 'sm:pt-20'
      } sm-max-h:!pt-16
    `}
    >
      <motion.figure layout>
        <ProfileImage isHome={isHome} className="mb-4 flex-none" />
      </motion.figure>

      <motion.section
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ ease: 'easeInOut' }}
        className="flex w-full flex-col space-y-4"
      >
        {children}
      </motion.section>
    </main>
  );
};

export default Layout;
