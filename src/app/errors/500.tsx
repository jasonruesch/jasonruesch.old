import { useRouteError } from 'react-router-dom';

export function Error500() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="mx-auto grid h-full max-w-xl pt-16 pb-4 sm:place-items-center sm:py-20">
      <div className="w-full">
        <h1>500</h1>
        <div className="space-y-4">
          <p className="text-neutral-500 dark:text-neutral-400">
            You just hit an unexpected error... the horror.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Error500;
