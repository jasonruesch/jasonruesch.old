import { Page } from '@/components';
import { useRouteError } from 'react-router-dom';

interface Error {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as Error | undefined;
  console.error(error);

  return (
    <Page>
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error?.statusText || error?.message}</i>
        </p>
      </div>
    </Page>
  );
}
