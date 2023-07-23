import {
  AboutPage,
  ContactPage,
  EasterEggPage,
  HomePage,
  PrivacyPage,
} from '@/pages';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Page } from './page';

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <main className="relative h-full">
      <AnimatePresence initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Page>
                <HomePage />
              </Page>
            }
          />
          <Route
            path="/about"
            element={
              <Page>
                <AboutPage />
              </Page>
            }
          />
          <Route
            path="/contact"
            element={
              <Page>
                <ContactPage />
              </Page>
            }
          />
          <Route
            path="/privacy"
            element={
              <Page>
                <PrivacyPage />
              </Page>
            }
          />
          <Route
            path="/easter-egg"
            element={
              <Page transparent>
                <EasterEggPage />
              </Page>
            }
          />
        </Routes>
      </AnimatePresence>
    </main>
  );
};
