import { SecondaryNavigationItem } from '@/components/Navbar';
import StyleguideColorCards from '@/components/styleguide/ColorCards';

export function Styleguide() {
  return (
    <div className="w-full space-y-4">
      <h1>Style Guide</h1>

      <h2 id="colors">Colors</h2>

      <div className="space-y-8">
        <StyleguideColorCards
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
        />
        <StyleguideColorCards
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
        />
        <StyleguideColorCards
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
        />
        <StyleguideColorCards
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
        />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const secondaryNavigation: SecondaryNavigationItem[] = [
    { name: 'Colors', href: '#colors' },
    { name: 'Typography', href: '#typography' },
    { name: 'Shadows', href: '#shadows' },
  ];

  return {
    props: {
      secondaryNavigation,
      shouldShowSearch: true,
    },
  };
}

export default Styleguide;
