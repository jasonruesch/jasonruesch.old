import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ANIMATIONS_DISABLED,
  AnimatedOutlet,
  headerVariants,
  mainVariants,
} from 'src/lib';
import { Background, Navbar } from '../components';

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
  const [shouldSlideLeft, setShouldSlideLeft] = useState(false);

  const handleScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
    const isScrolled = e.currentTarget.scrollTop > 0;
    setIsScrolled(isScrolled);
  }, []);

  const handleWillNavigate = useCallback(
    (page: Page) => {
      const shouldSlideLeft =
        (pages.get(pathname)?.index as number) > page.index;
      setShouldSlideLeft(shouldSlideLeft);
    },
    [pathname]
  );

  // Reset the scroll status when the route changes
  useEffect(() => {
    setIsScrolled(false);
  }, [pathname]);

  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          className="relative bg-gradient-to-b from-neutral-100 via-cyan-600 to-fuchsia-600 dark:from-neutral-800 dark:via-violet-500 dark:to-teal-500"
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Background />

          <motion.header
            className={clsx(
              // shadow marked as important to override the animate variant
              ANIMATIONS_DISABLED || isScrolled
                ? '!shadow !shadow-black/50'
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
            />
          </motion.header>

          <motion.main
            className={clsx(
              ANIMATIONS_DISABLED
                ? 'scale-[0.6] overflow-hidden rounded-2xl shadow-2xl shadow-black/75 ring-1 ring-black ring-opacity-5'
                : 'overflow-scroll',
              // 'hidden', // Uncomment to test hiding the main content
              'relative z-10 h-screen bg-neutral-100 px-4 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50 sm:px-8'
            )}
            custom={{ shouldSlideLeft }}
            variants={ANIMATIONS_DISABLED ? undefined : mainVariants}
            onScroll={handleScroll}
          >
            <AnimatedOutlet />
          </motion.main>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
