import { Route, Routes } from 'react-router-dom';
import Home from './home/home';
import About from './about/about';
import Contact from './contact/contact';
import { useEffect, useState } from 'react';
import { Beams, Header, Navbar, PageTransitions } from '@/components';

export function App() {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    isHydrated && (
      <>
        <Header className="z-30">
          {(disclosureRenderPropArg) => (
            <Navbar
              className="mx-auto max-w-screen-lg px-4 sm:px-8"
              disclosureRenderPropArg={disclosureRenderPropArg}
            />
          )}
        </Header>
        <Beams className="z-10" />
        <PageTransitions>
          <main className="flex min-h-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50">
            <div className="z-20 mx-auto w-full max-w-screen-lg px-4 sm:px-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
          </main>
        </PageTransitions>
      </>
    )
  );
}

export default App;
