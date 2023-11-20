import { Route } from 'react-router-dom';
import ErrorPage from './error-page';
import { projectRoutes } from './projects';

export const routes = [
  <Route errorElement={<ErrorPage />}>
    <Route index lazy={() => import('./home')} />
    <Route path="about" lazy={() => import('./about')} />
    <Route path="contact" lazy={() => import('./contact')} />
    {projectRoutes}
    <Route path="privacy" lazy={() => import('./privacy')} />
  </Route>,
];
