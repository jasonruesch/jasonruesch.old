import {
  FadePageAnimationVariants,
  PageTransitionContext,
  PageTransitionVariants,
  SlidePageAnimationVariants,
  WillNavigateContext,
} from '@/lib';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { Background } from './background';
import { LogoNeutral } from './logo-neutral';
import { PageBackground } from './page-background';

const stageAnimations = false; // Used for testing what the page looks like during animations

interface PageProps {
  children?: React.ReactNode;
  transparent?: boolean;
  hideFooterLogo?: boolean;
}

export const Page = ({ children, transparent, hideFooterLogo }: PageProps) => {
  const { slideRight } = useContext(WillNavigateContext);
  const [pageAnimationType] = useContext(PageTransitionContext);
  const {
    pageContentVariants,
    pageFooterVariants,
    pageScrollVariants,
    pageVariants,
  } = (
    pageAnimationType === 'slide'
      ? SlidePageAnimationVariants
      : FadePageAnimationVariants
  ) as PageTransitionVariants;

  return (
    <>
      <Background fixed={transparent} />

      <motion.main
        className="relative z-10 min-h-screen"
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{ transparent, slideRight, stageAnimations }}
        variants={pageVariants}
      >
        <motion.div
          className={clsx(
            'relative min-h-screen',
            transparent ? '' : 'bg-neutral-100 dark:bg-neutral-800'
          )}
          initial={false}
          animate="animate"
          exit="exit"
          variants={pageScrollVariants}
          transition={{ duration: 0 }}
        >
          {!transparent && <PageBackground />}

          <motion.div
            className={clsx(
              transparent
                ? 'pb-safe-offset-4 lg:pb-safe-offset-8'
                : hideFooterLogo
                ? 'pb-safe-offset-14'
                : 'pb-safe-offset-36 lg:pb-safe-offset-44',
              'relative z-10 grid min-h-screen place-items-center pt-safe-offset-16 px-safe-offset-4 supports-[-webkit-touch-callout:none]:box-content sm:pt-safe-offset-20 sm:px-safe-offset-6 lg:pt-safe-offset-24 lg:px-safe-offset-8'
            )}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={transparent ? undefined : pageContentVariants}
          >
            {children}
          </motion.div>

          {!transparent && (
            <motion.footer
              className={clsx(
                hideFooterLogo ? 'h-14' : 'h-36 lg:h-44',
                'absolute bottom-0 flex w-full flex-col items-center justify-end pt-4 pb-safe-offset-4 lg:pt-8 lg:pb-safe-offset-8'
              )}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={{ stageAnimations }}
              variants={transparent ? undefined : pageFooterVariants}
            >
              {!hideFooterLogo && <LogoNeutral className="h-12 w-12 flex-1" />}

              <p className="text-sm text-neutral-400 dark:text-neutral-500">
                &copy; {new Date().getFullYear()} Jason Ruesch. All rights
                reserved.
              </p>
            </motion.footer>
          )}
        </motion.div>
      </motion.main>
    </>
  );
};
