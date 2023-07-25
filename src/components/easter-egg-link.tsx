import { easterEggId } from '@/lib';
import { PageNavLink } from './page-nav-link';

export const EasterEggLink = () => {
  return (
    <div className="fixed bottom-0 right-0 z-20 h-12 w-12 rounded-full mr-safe mb-safe">
      <PageNavLink
        to={`/easter-egg/${easterEggId}`}
        className="flex h-full w-full items-center justify-center"
      >
        <span className="sr-only">You found an easter egg! Click to view.</span>
      </PageNavLink>
    </div>
  );
};
