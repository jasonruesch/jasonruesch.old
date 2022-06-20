import { motion } from 'framer-motion';

export const Layout = ({ children, isHome }) => {
  return (
    <main
      className={`mx-auto flex max-w-screen-sm flex-col items-center justify-start px-4 pt-16 pb-4
      sm:min-h-screen sm:px-6 lg:px-8 ${
        isHome
          ? 'sm-max-h:!flex-row sm-max-h:!justify-start sm:justify-center sm:pt-0'
          : 'sm:pt-20'
      } space-y-4 sm-max-h:!pt-16
    `}
    >
      <motion.figure
        layoutId="profile-image"
        className={`relative h-[150px] w-[150px] flex-none rounded-full ${
          isHome ? 'md:h-[300px] md:w-[300px]' : 'sm-max-h:hidden'
        }`}
      >
        <motion.img
          initial={{ rotate: -180 }}
          animate={{ rotate: 0 }}
          exit={{ rotate: 180 }}
          src="/images/profile.png"
          alt="Jason Ruesch"
          className="bg-primary rounded-full"
        />
      </motion.figure>

      <motion.section
        layoutId="content"
        initial={{ opacity: 0, scale: 0.75 }}
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
