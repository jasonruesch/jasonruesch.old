import { NavItem } from '@/components/nav/Navbar';
import { useSearch } from '@/hooks/useSearch';
import data from '@/data/styleguide.data';
import { useState } from 'react';
import SearchInput from '@/components/SearchInput';
import { ScrollSubNav } from '@/components/nav/ScrollSubNav';
import { MobileScrollNav } from '@/components/nav/MobileScrollNav';
import { BackToTopButton } from '@/components/BackToTopButton';
import Layout from '@/components/Layout';

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
        <div className="w-full">
          <h1>Style Guide</h1>

          {filteredData?.map(({ id, title, sections }) => (
            <section
              key={id}
              id={id}
              className="py-4 last-of-type:min-h-screen print:last-of-type:min-h-0"
            >
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
