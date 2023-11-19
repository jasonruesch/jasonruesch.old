import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from './app/app';
import ErrorPage from './app/error-page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index lazy={() => import('@jasonruesch/portfolio-ui-home')} />
        <Route
          path="about"
          lazy={() => import('@jasonruesch/portfolio-ui-about')}
        />
        <Route
          path="contact"
          lazy={() => import('@jasonruesch/portfolio-ui-contact')}
        />
        <Route
          path="projects"
          lazy={() => import('@jasonruesch/portfolio-ui-projects')}
        />
        <Route
          path="privacy"
          lazy={() => import('@jasonruesch/portfolio-ui-privacy')}
        />
      </Route>
    </Route>,
  ),
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
