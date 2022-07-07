import clsx from 'clsx';
import { Fragment, ReactElement } from 'react';
import CopyButton from './CopyButton';

export default function StyleguideTypographyCard({
  className,
  title,
  items,
}: {
  className?: string;
  title: string;
  items: {
    title: string;
    description: string;
    example: ReactElement;
    fontFamily?: string;
    fontWeight?: string;
    fontSize?: string;
    alternateFontSize?: string;
  }[];
}) {
  return (
    <div
      className={clsx(
        'bg-surface text-on-survface rounded-lg shadow ring-1 ring-black/10 dark:shadow-black dark:ring-0',
        className
      )}
    >
      <div className="relative overflow-hidden rounded-t-lg px-5 py-3">
        <h3>{title}</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {items.map(
            (
              {
                title,
                fontFamily,
                fontWeight,
                fontSize,
                alternateFontSize,
                example,
                description,
              },
              index
            ) => (
              <Fragment key={`item-${index}`}>
                <div>
                  <h4>{title}</h4>
                  {(fontFamily || fontWeight) && (
                    <p>{`${fontFamily}${
                      fontWeight ? ` ${fontWeight}` : ''
                    }`}</p>
                  )}
                  {fontSize && <p className="text-xs">{fontSize}</p>}
                  {alternateFontSize && (
                    <p className="text-xs">{alternateFontSize}</p>
                  )}
                </div>
                <div className="col-span-1 sm:col-span-2">
                  {example}
                  <div className="flex">
                    <p className="text-primary-500 dark:text-primary-400 flex-1 pt-1 text-xs">
                      {description}
                    </p>
                    <CopyButton value={description} />
                  </div>
                </div>
              </Fragment>
            )
          )}
        </div>
      </div>
    </div>
  );
}
