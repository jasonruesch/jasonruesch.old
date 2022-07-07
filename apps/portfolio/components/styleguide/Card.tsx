import { ReactNode } from 'react';
import clsx from 'clsx';
import CopyButton from './CopyButton';

export default function StyleguideCard({
  className,
  children,
  title,
  description,
}: {
  className?: string;
  children?: ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <div
      className={clsx(
        'bg-surface text-on-survface divide-y divide-black/10 rounded-lg shadow ring-1 ring-black/10 dark:divide-black dark:shadow-black dark:ring-0',
        className
      )}
    >
      <div className="relative flex min-h-[160px] items-stretch justify-center overflow-hidden rounded-t-lg">
        {children}
      </div>
      <div className="bg-surface rounded-b-lg px-5 py-3">
        <div className="text-sm">
          <span>{title}</span>
          <div className="flex">
            <p className="text-primary-500 dark:text-primary-400 flex-1 pt-1 text-xs">
              {description}
            </p>
            <CopyButton value={description} />
          </div>
        </div>
      </div>
    </div>
  );
}
