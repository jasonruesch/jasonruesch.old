import { pageVariants } from '@/lib';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface PageProps {
  children: React.ReactNode;
  transparent?: boolean;
}
export const Page = ({ children, transparent }: PageProps) => {
  return (
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
        className="flex min-h-full flex-col items-center justify-center px-4 pt-16 pb-4"
        initial={false}
        animate={{ y: 0 }}
        exit={{ y: `-${0}px` }}
        transition={{ duration: 0 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
