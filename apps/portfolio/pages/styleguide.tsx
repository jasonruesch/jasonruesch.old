import { SecondaryNavigationItem } from '@/components/Navbar';
import { useSearch } from '@/hooks/useSearch';
import data from '@/data/styleguide.data';

export function Styleguide({ searchInput }: { searchInput?: string }) {
  const filteredData = useSearch(searchInput, data);

  return (
    <div className="w-full">
      <h1>Style Guide</h1>

      {filteredData?.map(({ id, title, sections }) => (
        <section key={id} id={id} className="py-4 last-of-type:min-h-screen">
          <h2>{title}</h2>

          <div className="mt-4 space-y-8">
            {sections.map((section) => section)}
          </div>
        </section>
      ))}

      {filteredData?.length === 0 && (
        <section className="py-4">
          <h2>
            No results for &quot;
            <span className="text-secondary-500 dark:text-secondary-400 font-sans text-base sm:text-2xl">
              {searchInput}
            </span>
            &quot; were found
          </h2>
        </section>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const secondaryNavigation: SecondaryNavigationItem[] = [
    { name: 'Colors', id: 'colors' },
    { name: 'Typography', id: 'typography' },
    { name: 'Shadows', id: 'shadows' },
    { name: 'Buttons', id: 'buttons' },
  ];

  return {
    props: {
      secondaryNavigation,
      shouldShowSearch: true,
    },
  };
}

export default Styleguide;
