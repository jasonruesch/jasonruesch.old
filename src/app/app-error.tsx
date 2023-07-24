import { Header } from '@/components';
import ErrorPage from 'src/pages/error';

export function AppError() {
  return (
    <>
      <Header />
      <main className="relative h-full">
        <ErrorPage />
      </main>
    </>
  );
}

export default AppError;
