import { SecondaryNavigationItem } from '@/components/Navbar';

export function Styleguide() {
  return (
    <div className="w-full space-y-4">
      <h1 className="font-display text-2xl font-bold sm:text-4xl">
        Style Guide
      </h1>
    </div>
  );
}

export async function getStaticProps() {
  const secondaryNavigation: SecondaryNavigationItem[] = [
    { name: 'Colors', href: '#colors', current: true },
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
