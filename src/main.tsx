import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import About from './app/about/about';
import App from './app/app';
import Contact from './app/contact/contact';
import Error404 from './app/errors/404';
import Error500 from './app/errors/500';
import Home from './app/home/home';
import Privacy from './app/privacy/privacy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error500 />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'privacy', element: <Privacy /> },
      { path: '404', element: <Error404 /> },
      { path: '*', element: <Error404 /> },
    ],
  },
  { path: '/500', element: <Error500 /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
