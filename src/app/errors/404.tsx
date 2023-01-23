export function Error404() {
  return (
    <div className="mx-auto grid h-full max-w-xl pt-16 pb-4 sm:place-items-center sm:py-20">
      <div className="w-full">
        <h1>404</h1>
        <div className="space-y-4">
          <p className="text-neutral-500 dark:text-neutral-400">
            You just hit a route that doesn&#39;t exist... the sadness.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Error404;
