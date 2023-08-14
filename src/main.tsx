import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import App from './app/app';
import AppError from './app/app-error';
import { RouteHandle } from './lib';
import {
  AboutPage,
  ContactPage,
  EasterEggPage,
  HomePage,
  PrivacyPage,
  ProjectListPage,
  ProjectPage,
  RedirectPage,
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
          {
            path: 'projects',
            children: [
              { index: true, element: <ProjectListPage /> },
              { path: ':projectId', element: <ProjectPage /> },
            ],
          },
          { path: 'contact', element: <ContactPage /> },
          { path: 'privacy', element: <PrivacyPage /> },
          {
            path: 'easter-egg/:uid',
            element: <EasterEggPage />,
            handle: { transparent: true } satisfies RouteHandle,
          },
          { path: 'redirect', element: <RedirectPage /> },
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
