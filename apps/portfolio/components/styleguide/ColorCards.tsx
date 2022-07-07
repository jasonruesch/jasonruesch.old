import clsx from 'clsx';
import StyleguideCard from './Card';
import { capitalCase } from 'change-case';

export default function StyleguideColorCards({
  title,
  bgColorClassNames,
}: {
  title: string;
  bgColorClassNames: string[];
}) {
  return (
    <div>
      <h3>{title}</h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {bgColorClassNames.map((bgColor) => {
          const description = bgColor.replace('bg-', '-');
          const colorName = capitalCase(description);
          return (
            <StyleguideCard
              key={bgColor}
              title={colorName}
              description={description}
            >
              <div className={clsx('w-full', bgColor)}></div>
            </StyleguideCard>
          );
        })}
      </div>
    </div>
  );
}
