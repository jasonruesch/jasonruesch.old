import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import App from './app/app';
import AppError from './app/app-error';
import {
  AboutPage,
  ContactPageWithFormik,
  EasterEggPage,
  HomePage,
  PrivacyPage,
} from './pages';
import ErrorPage from './pages/error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <AppError />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'about', element: <AboutPage /> },
          // { path: 'contact', element: <ContactPage />, action: contactAction },
          { path: 'contact', element: <ContactPageWithFormik /> },
          { path: 'privacy', element: <PrivacyPage /> },
          { path: 'easter-egg/:uid', element: <EasterEggPage /> },
          { path: '*', element: <Navigate to="/" /> },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
