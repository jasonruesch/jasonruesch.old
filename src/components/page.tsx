import { footerVariants, innerPageVariants, pageVariants } from '@/lib';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Background } from './background';
import { LogoNeutral } from './logo-neutral';

interface PageProps {
  children: React.ReactNode;
  transparent?: boolean;
  hideFooter?: boolean;
}

export const Page = ({ children, transparent, hideFooter }: PageProps) => {
  const stageAnimations = false; // Used for testing what the page looks like during animations

  return (
    <>
      <Background fixed={transparent} />

      <motion.main
        className="relative z-10 min-h-screen"
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{ transparent, stageAnimations }}
        variants={pageVariants}
      >
        <motion.div
          className={clsx(
            'grid min-h-screen place-items-center pb-safe-offset-32 pt-safe-offset-16 px-safe-offset-4 supports-[-webkit-touch-callout:_none]:box-content sm:pt-safe-offset-20',
            transparent ? '' : 'bg-neutral-100 dark:bg-neutral-800'
          )}
          initial={false}
          animate="animate"
          exit="exit"
          variants={innerPageVariants}
          transition={{ duration: 0 }}
        >
          {children}
        </motion.div>

        <motion.footer
          className="absolute bottom-0 grid h-28 w-full place-items-center"
          initial="initial"
          animate="animate"
          exit="exit"
          custom={{ stageAnimations }}
          variants={footerVariants}
        >
          {!hideFooter && <LogoNeutral className="h-12 w-12" />}
        </motion.footer>
      </motion.main>
    </>
  );
};
