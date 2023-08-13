import { Page } from '@/components';
import { duration } from '@/lib';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const RedirectPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = searchParams.get('url');
    if (url) {
      setTimeout(() => {
        navigate(url, { replace: true });
      }, duration * 1000); // Wait for the page animation to finish
    }
  }, [searchParams, navigate]);

  return (
    <Page>
      <div>
        <h1 className="font-display text-2xl font-medium sm:text-4xl">
          Redirecting...
        </h1>
      </div>
    </Page>
  );
};
