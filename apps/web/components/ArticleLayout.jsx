import Head from 'next/head';
import { useRouter } from 'next/router';
import { formatDate } from '../lib/formatDate';
import { Prose } from './Prose';

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArticleLayout({
  children,
  meta,
  isRssFeed = false,
  previousPathname,
}) {
  const router = useRouter();

  if (isRssFeed) {
    return children;
  }

  return (
    <>
      <Head>
        <title>{`${meta.title} - Jason Ruesch`}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <div className="pt-16 pb-40">
        <div className="w-full pt-6">
          <div className="space-y-4">
            {previousPathname && (
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back to articles"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-neutral-800/5 ring-1 ring-neutral-900/5 transition dark:border dark:border-neutral-700/50 dark:bg-neutral-800 dark:ring-0 dark:ring-white/10 dark:hover:border-neutral-700 dark:hover:ring-white/20"
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-neutral-500 transition group-hover:stroke-neutral-700 dark:stroke-neutral-500 dark:group-hover:stroke-neutral-400" />
              </button>
            )}
            <article>
              <header className="flex flex-col">
                <h1 className="mt-4">{meta.title}</h1>
                <time
                  dateTime={meta.date}
                  className="order-first flex items-center text-base text-neutral-400 dark:text-neutral-500"
                >
                  <span className="h-4 w-0.5 rounded-full bg-neutral-200 dark:bg-neutral-500" />
                  <span className="ml-3">{formatDate(meta.date)}</span>
                </time>
              </header>
              <Prose className="mt-4">{children}</Prose>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
