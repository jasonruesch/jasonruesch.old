import { NavItem } from '@portfolio/components/nav/Navbar';
import { useSearch } from '@portfolio/hooks/useSearch';
import data from '@portfolio/data/styleguide.data';
import { useState } from 'react';
import { SearchInput } from '@portfolio/components/SearchInput';
import { ScrollSubNav } from '@portfolio/components/nav/ScrollSubNav';
import { MobileScrollNav } from '@portfolio/components/nav/MobileScrollNav';
import { BackToTopButton } from '@portfolio/components/BackToTopButton';
import Layout from '@portfolio/components/Layout';

const navigation: NavItem[] = [
  { name: 'Colors', href: 'colors' },
  { name: 'Typography', href: 'typography' },
  { name: 'Shadows', href: 'shadows' },
  { name: 'Buttons', href: 'buttons' },
];

export function Styleguide() {
  const [searchInput, setSearchInput] = useState('');
  const filteredData = useSearch(searchInput, data);

  return (
    <>
      <Layout
        searchInput={
          <SearchInput
            className="w-full max-w-lg md:max-w-xs"
            onSearch={setSearchInput}
          />
        }
        subNav={
          <ScrollSubNav
            className="flex items-center overflow-x-auto whitespace-nowrap"
            items={navigation}
          />
        }
        mobileSubNav={<MobileScrollNav items={navigation} />}
      >
        <div>
          <h1>Style Guide</h1>

          {filteredData?.map(({ id, title, sections }) => (
            <section
              key={id}
              id={id}
              className="my-2 py-2 last-of-type:min-h-screen print:last-of-type:min-h-0"
            >
              <h2>{title}</h2>

              <div className="mt-4 space-y-8">
                {sections.map((section) => section)}
              </div>
            </section>
          ))}

          {filteredData?.length === 0 && (
            <section className="my-2 py-2">
              <h2>
                No results for &quot;
                <span className="text-secondary font-sans text-base sm:text-2xl">
                  {searchInput}
                </span>
                &quot; were found
              </h2>
            </section>
          )}
        </div>
      </Layout>

      <BackToTopButton />
    </>
  );
}

export default Styleguide;
