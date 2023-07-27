export const Button = {
  '.btn-primary': {
    '@apply inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm dark:shadow-black':
      {},
    '@apply bg-cyan-600 text-white dark:bg-violet-500': {},
    '@apply enabled:hover:bg-cyan-700 enabled:hover:text-white dark:enabled:hover:bg-violet-600':
      {},
    '@apply focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-neutral-50 dark:focus:ring-violet-400 dark:focus:ring-offset-neutral-900':
      {},
    '@apply disabled:bg-neutral-200 disabled:text-neutral-500 dark:disabled:bg-neutral-700 dark:disabled:text-neutral-400':
      {},
    // @apply rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:bg-violet-500 dark:hover:bg-violet-400 dark:focus-visible:outline-violet-500;
  },
  '.btn-secondary': {
    '@apply inline-flex items-center justify-center rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium shadow-sm dark:border-transparent dark:shadow-black':
      {},
    '@apply bg-white text-neutral-900 dark:bg-white/10 dark:text-white dark:hover:bg-white/20':
      {},
    '@apply enabled:hover:bg-neutral-50 dark:enabled:hover:bg-white/20': {},
    '@apply focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-neutral-50 dark:focus:ring-violet-400 dark:focus:ring-offset-neutral-900':
      {},
    '@apply disabled:bg-neutral-200 disabled:text-neutral-500 dark:disabled:bg-neutral-700 dark:disabled:text-neutral-400':
      {},
    // @apply rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 dark:bg-white/10 dark:text-white dark:ring-0 dark:hover:bg-white/20;
  },
};