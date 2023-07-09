export function Error404() {
  return (
    <div className="grid h-full sm:place-items-center">
      <div className="mx-auto w-full max-w-xl pt-6 sm:pt-0">
        <div className="space-y-4">
          <h1>404</h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            You just hit a route that doesn&#39;t exist... the sadness.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Error404;
