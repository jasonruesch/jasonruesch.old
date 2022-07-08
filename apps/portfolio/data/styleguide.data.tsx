import { ReactElement } from 'react';
import StyleguideCard from '@/components/styleguide/Card';
import StyleguideColorCards from '@/components/styleguide/ColorCards';
import StyleguideTypographyCard from '@/components/styleguide/TypographyCard';

export interface StyleguideData {
  id: string;
  title: string;
  sections: ReactElement[];
}

export const colors = {
  id: 'colors',
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

export const typography = {
  id: 'typography',
  title: 'Typography',
  sections: [
    <StyleguideTypographyCard
      key="headings"
      title="Headings"
      items={[
        {
          title: 'Heading H1',
          fontFamily: 'Alegreya Sans SC',
          fontWeight: 'Bold',
          fontSize: '24px / 32px',
          alternateFontSize: '36px / 40px (small screens and above)',
          example: (
            <>
              <h1 key="h1-example" className="font-display text-2xl font-bold">
                Etiam nec metus vitae lectus
              </h1>
              <h1
                key="h1-example-sm"
                className="font-display text-4xl font-bold"
              >
                Etiam nec metus vitae lectus
              </h1>
            </>
          ),
          description: 'font-display text-2xl font-bold sm:text-4xl',
        },
        {
          title: 'Heading H2',
          fontFamily: 'Alegreya Sans SC',
          fontWeight: 'Bold',
          fontSize: '20px / 28px',
          alternateFontSize: '30px / 36px (small screens and above)',
          example: (
            <>
              <h2 key="h2-example" className="font-display text-xl font-bold">
                Etiam nec metus vitae lectus
              </h2>
              <h2
                key="h2-example-sm"
                className="font-display text-3xl font-bold"
              >
                Etiam nec metus vitae lectus
              </h2>
            </>
          ),
          description: 'font-display text-xl font-bold sm:text-3xl',
        },
        {
          title: 'Heading H3',
          fontFamily: 'Alegreya Sans SC',
          fontWeight: 'Bold',
          fontSize: '18px / 28px',
          alternateFontSize: '24px / 32px (small screens and above)',
          example: (
            <>
              <h3 key="h3-example" className="font-display text-lg font-bold">
                Etiam nec metus vitae lectus
              </h3>
              <h3
                key="h3-example-sm"
                className="font-display text-2xl font-bold"
              >
                Etiam nec metus vitae lectus
              </h3>
            </>
          ),
          description: 'font-display text-lg font-bold sm:text-2xl',
        },
        {
          title: 'Heading H4',
          fontFamily: 'Inter',
          fontWeight: 'Bold',
          fontSize: '16px / 24px',
          alternateFontSize: '20px / 28px (small screens and above)',
          example: (
            <>
              <h4 key="h4-example" className="text-xl font-bold">
                Etiam nec metus vitae lectus
              </h4>
              <h4 key="h4-example-sm" className="text-base font-bold">
                Etiam nec metus vitae lectus
              </h4>
            </>
          ),
          description: 'font-bold sm:text-xl',
        },
      ]}
    />,
  ],
};

export const shadows = {
  id: 'shadows',
  title: 'Shadows',
  sections: [
    <div
      key="shadows"
      className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
    >
      <StyleguideCard key="shadow" title="Shadow" description="shadow">
        <div className="bg-background flex w-full items-center justify-center">
          <div className="bg-surface h-20 w-20 rounded-md shadow"></div>
        </div>
      </StyleguideCard>
      <StyleguideCard
        key="shadow-md"
        title="Shadow Medium"
        description="shadow-md"
      >
        <div className="bg-background flex w-full items-center justify-center">
          <div className="bg-surface h-20 w-20 rounded-md shadow-md"></div>
        </div>
      </StyleguideCard>
      <StyleguideCard
        key="shadow-lg"
        title="Shadow Large"
        description="shadow-lg"
      >
        <div className="bg-background flex w-full items-center justify-center">
          <div className="bg-surface h-20 w-20 rounded-md shadow-lg"></div>
        </div>
      </StyleguideCard>
    </div>,
  ],
};

export const data = [colors, typography, shadows];

export default data;
