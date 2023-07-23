import { pageVariants } from '@/lib';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Background } from './background';

interface PageProps {
  children: React.ReactNode;
  transparent?: boolean;
}
export const Page = ({ children, transparent }: PageProps) => {
  return (
    <>
      <Background fixed={transparent} />

      <motion.div
        className={clsx(
          'h-full',
          transparent ? '' : 'bg-neutral-100 dark:bg-neutral-800'
        )}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{ transparent }}
        variants={pageVariants}
      >
        <motion.div
          className="grid min-h-full place-content-center px-safe-offset-4 pt-safe-offset-16 pb-safe-offset-4"
          initial={false}
          animate={{ y: 0 }}
          exit={{ y: `-${0}px` }}
          transition={{ duration: 0 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
};
