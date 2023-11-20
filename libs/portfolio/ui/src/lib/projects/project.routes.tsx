import { Route } from 'react-router-dom';

export const projectRoutes = (
  <Route path="/projects">
    <Route index lazy={() => import('./project-list')} />
    <Route path=":id" lazy={() => import('./project')} />
  </Route>
);
