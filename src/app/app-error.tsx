import { Header } from '@/components';
import ErrorPage from '../pages/error';

export function AppError() {
  return (
    <div className="relative overflow-hidden">
      <Header />
      <ErrorPage />
    </div>
  );
}

export default AppError;
