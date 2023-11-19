import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : '';

  return (
    <div className="h-full grid place-content-center text-center">
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="text-neutral-500 dark:text-neutral-400">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-neutral-500 dark:text-neutral-400">
        <i>{message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
