import { SecondaryNavigationItem } from '@/components/Navbar';
import { useSearch } from '@/hooks/useSearch';
import data from '@/data/styleguide.data';
import { BackToTopButton } from '@/components/BackToTopButton';

export function Styleguide({ searchInput }: { searchInput?: string }) {
  const filteredData = useSearch(searchInput, data);

  return (
    <>
      <div className="w-full space-y-4">
        <h1>Style Guide</h1>

        {filteredData?.map(({ id, title, sections }) => (
          <section key={id} id={id} className="last-of-type:min-h-screen">
            <h2>{title}</h2>

            <div className="mt-4 space-y-8">
              {sections.map((section) => section)}
            </div>
          </section>
        ))}
      </div>

      <BackToTopButton />
    </>
  );
}

export async function getStaticProps() {
  const secondaryNavigation: SecondaryNavigationItem[] = [
    { name: 'Colors', id: 'colors' },
    { name: 'Typography', id: 'typography' },
    { name: 'Shadows', id: 'shadows' },
  ];

  return {
    props: {
      secondaryNavigation,
      shouldShowSearch: true,
    },
  };
}

export default Styleguide;
