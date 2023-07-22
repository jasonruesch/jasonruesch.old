import clsx from 'clsx';

export function App() {
  return (
    <>
      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-10 box-content flex h-16 items-center px-safe pt-safe'
          // 'bg-neutral-100 shadow-sm dark:bg-neutral-800 dark:shadow-black'
        )}
      >
        <div className="w-full text-center">header</div>
      </header>
      <main className="flex h-full flex-col items-center justify-center px-safe pb-safe pt-safe-offset-16 supports-[-web-touch-callout:_none]:box-content">
        <div>main</div>
      </main>
    </>
  );
}

export default App;
