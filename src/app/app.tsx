import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Background, Navbar } from '../components';
import {
  ANIMATIONS_DISABLED,
  AnimatedOutlet,
  headerVariants,
  mainInnerVariants,
  mainVariants,
} from '../lib';

export interface Page {
  name: string;
  index: number;
  type: 'primary' | 'secondary';
}

export const pages = new Map<string, Page>([
  ['/', { name: 'Home', index: 0, type: 'primary' }],
  ['/about', { name: 'About', index: 1, type: 'primary' }],
  ['/contact', { name: 'Contact', index: 2, type: 'primary' }],
  ['/privacy', { name: 'Privacy', index: 3, type: 'secondary' }],
]);

export function App() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldSlideLeft, setShouldSlideLeft] = useState(false);
  const [pageScrollOffset, setPageScrollOffset] = useState(0);

  const handleWillNavigate = useCallback(
    (page: Page) => {
      const shouldSlideLeft =
        (pages.get(pathname)?.index as number) > page.index;
      setShouldSlideLeft(shouldSlideLeft);
      setPageScrollOffset(window.scrollY);
    },
    [pathname]
  );

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setIsScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Reset the scroll and menu open statuses when the route changes
  useEffect(() => {
    setIsScrolled(false);
    setIsMenuOpen(false);
    setPageScrollOffset(0);
  }, [pathname]);

  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          className="relative overflow-x-hidden bg-gradient-to-b from-neutral-100 via-cyan-600 to-fuchsia-600 dark:from-neutral-800 dark:via-violet-500 dark:to-teal-500"
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Background />

          <motion.header
            className={clsx(
              ANIMATIONS_DISABLED || isScrolled
                ? // shadow marked as important to override the animate variant
                  '!shadow !shadow-black/50'
                : '',
              // 'hidden', // Uncomment to test hiding the header
              'fixed inset-x-0 top-0 z-20 text-neutral-900 dark:text-neutral-50'
            )}
            variants={ANIMATIONS_DISABLED ? undefined : headerVariants}
          >
            <Navbar
              className="px-4 sm:px-8"
              isScrolled={isScrolled}
              pages={pages}
              onWillNavigate={handleWillNavigate}
              onOpenChange={(open) => setIsMenuOpen(open)}
            />
          </motion.header>

          <motion.main
            className={clsx(
              ANIMATIONS_DISABLED
                ? 'h-screen scale-[0.6] overflow-hidden rounded-2xl shadow-2xl shadow-black/75 ring-1 ring-black ring-opacity-5'
                : isMenuOpen
                ? // height and overflow marked as important to override the animate variant
                  '!h-screen !overflow-hidden'
                : 'min-h-screen',
              // 'hidden', // Uncomment to test hiding the main content
              'relative z-10 bg-neutral-100 px-4 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50 sm:px-8'
            )}
            custom={{ shouldSlideLeft }}
            variants={ANIMATIONS_DISABLED ? undefined : mainVariants}
          >
            <motion.div
              initial={false}
              animate="animate"
              exit="exit"
              custom={pageScrollOffset}
              variants={ANIMATIONS_DISABLED ? undefined : mainInnerVariants}
            >
              <AnimatedOutlet />
            </motion.div>
          </motion.main>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
