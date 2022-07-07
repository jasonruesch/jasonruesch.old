import { SecondaryNavigationItem } from '@/components/Navbar';
import StyleguideCard from '@/components/styleguide/Card';
import StyleguideColorCards from '@/components/styleguide/ColorCards';
import { useSearch } from '@/hooks/useSearch';
import { useEffect } from 'react';

const colors = {
  title: 'Colors',
  sections: [
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
    <StyleguideColorCards
      key="neutral"
      title="Neutral"
      bgColorClassNames={[
        'bg-neutral-50',
        'bg-neutral-100',
        'bg-neutral-200',
        'bg-neutral-300',
        'bg-neutral-400',
        'bg-neutral-500',
        'bg-neutral-600',
        'bg-neutral-700',
        'bg-neutral-800',
        'bg-neutral-900',
      ]}
    />,
  ],
};

const typography = {
  title: 'Typography',
  sections: [
    <StyleguideCard
      key="h1"
      title="H1"
      description="font-display text-2xl font-bold sm:text-4xl"
    >
      <div className="flex items-center">
        <h1 className="font-display text-2xl font-bold sm:text-4xl">
          Heading H1
        </h1>
      </div>
    </StyleguideCard>,
    <StyleguideCard
      key="h2"
      title="H2"
      description="font-display text-xl font-bold sm:text-3xl"
    >
      <div className="flex items-center">
        <h1 className="font-display text-xl font-bold sm:text-3xl">
          Heading H2
        </h1>
      </div>
    </StyleguideCard>,
    <StyleguideCard
      key="h3"
      title="H3"
      description="font-display text-lg font-bold sm:text-2xl"
    >
      <div className="flex items-center">
        <h1 className="font-display text-lg font-bold sm:text-2xl">
          Heading H3
        </h1>
      </div>
    </StyleguideCard>,
  ],
};

const shadows = {
  title: 'Shadows',
  sections: [
    <div
      key="shadows"
      className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
    >
      <StyleguideCard title="Shadow" description="shadow">
        <div className="bg-background flex w-full items-center justify-center">
          <div className="bg-surface h-20 w-20 rounded-md shadow"></div>
        </div>
      </StyleguideCard>
      <StyleguideCard title="Shadow Medium" description="shadow-md">
        <div className="bg-background flex w-full items-center justify-center">
          <div className="bg-surface h-20 w-20 rounded-md shadow-md"></div>
        </div>
      </StyleguideCard>
      <StyleguideCard title="Shadow Large" description="shadow-lg">
        <div className="bg-background flex w-full items-center justify-center">
          <div className="bg-surface h-20 w-20 rounded-md shadow-lg"></div>
        </div>
      </StyleguideCard>
    </div>,
  ],
};

export function Styleguide({ searchInput }: { searchInput?: string }) {
  const filteredColors = useSearch(searchInput, colors);
  const filteredTypography = useSearch(searchInput, typography);
  const filteredShadows = useSearch(searchInput, shadows);

  useEffect(() => {
    // Apply the min-h-screen class to the last visible section
    document
      .querySelectorAll('section')
      ?.forEach((section) => section.classList.toggle('min-h-screen', false));
    document
      .querySelector('section:last-of-type')
      ?.classList.toggle('min-h-screen', true);
  }, [filteredColors, filteredTypography, filteredShadows]);

  return (
    <div className="w-full space-y-4">
      <h1>Style Guide</h1>

      {filteredColors?.length > 0 && (
        <section id="colors">
          <h2>{colors.title}</h2>

          <div className="mt-4 space-y-8">
            {filteredColors.map((section) => section)}
          </div>
        </section>
      )}

      {filteredTypography?.length > 0 && (
        <section id="typography">
          <h2>{typography.title}</h2>

          <div className="mt-4 space-y-8">
            {filteredTypography.map((section) => section)}
          </div>
        </section>
      )}

      {filteredShadows?.length > 0 && (
        <section id="shadows">
          <h2>{shadows.title}</h2>

          <div className="mt-4 space-y-8">
            {filteredShadows.map((section) => section)}
          </div>
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
  ];

  return {
    props: {
      secondaryNavigation,
      shouldShowSearch: true,
    },
  };
}

export default Styleguide;
