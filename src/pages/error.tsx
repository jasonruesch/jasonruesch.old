import { useRouteError } from 'react-router-dom';

interface Error {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as Error | undefined;
  console.error(error);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-display text-2xl font-medium sm:text-4xl">Oops!</h1>
      <div className="mt-4 lg:mt-8">
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error?.statusText || error?.message}</i>
        </p>
      </div>
    </div>
  );
}
