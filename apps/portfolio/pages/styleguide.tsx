import { SecondaryNavigationItem } from '@/components/Navbar';
import StyleguideColorCards from '@/components/styleguide/ColorCards';
import { useSearch } from '@/hooks/useSearch';

const cards = [
  <StyleguideColorCards
    key="primary"
    title="Primary"
    bgColorClassNames={[
      'bg-cyan-50',
      'bg-cyan-100',
      'bg-cyan-200',
      'bg-cyan-300',
      'bg-cyan-400',
      'bg-cyan-500',
      'bg-cyan-600',
      'bg-cyan-700',
      'bg-cyan-800',
      'bg-cyan-900',
    ]}
  />,
  <StyleguideColorCards
    key="secondary"
    title="Secondary"
    bgColorClassNames={[
      'bg-fuchsia-50',
      'bg-fuchsia-100',
      'bg-fuchsia-200',
      'bg-fuchsia-300',
      'bg-fuchsia-400',
      'bg-fuchsia-500',
      'bg-fuchsia-600',
      'bg-fuchsia-700',
      'bg-fuchsia-800',
      'bg-fuchsia-900',
    ]}
  />,
  <StyleguideColorCards
    key="dark-primary"
    title="Dark Primary"
    bgColorClassNames={[
      'bg-violet-50',
      'bg-violet-100',
      'bg-violet-200',
      'bg-violet-300',
      'bg-violet-400',
      'bg-violet-500',
      'bg-violet-600',
      'bg-violet-700',
      'bg-violet-800',
      'bg-violet-900',
    ]}
  />,
  <StyleguideColorCards
    key="dark-secondary"
    title="Dark Secondary"
    bgColorClassNames={[
      'bg-teal-50',
      'bg-teal-100',
      'bg-teal-200',
      'bg-teal-300',
      'bg-teal-400',
      'bg-teal-500',
      'bg-teal-600',
      'bg-teal-700',
      'bg-teal-800',
      'bg-teal-900',
    ]}
  />,
];

export function Styleguide({ searchInput }: { searchInput?: string }) {
  const results = useSearch(searchInput, { name: 'Colors', sections: cards });

  return (
    <div className="w-full space-y-4">
      <h1>Style Guide</h1>

      <div id="colors">
        <h2>Colors</h2>

        <div className="space-y-8">{results?.map((result) => result)}</div>
      </div>

      <div id="typography">
        <h2>Typography</h2>
      </div>

      <div id="shadows" className="min-h-screen">
        <h2>Shadows</h2>
      </div>
    </div>
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
