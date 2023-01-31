import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import About from './app/about/about';
import App from './app/app';
import Error404 from './app/errors/404';
import Contact from './app/contact/contact';
import Home from './app/home/home';
import Privacy from './app/privacy/privacy';
import Error500 from './app/errors/500';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error500 />,
    children: [
      { path: '', errorElement: <Error500 /> },
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'privacy', element: <Privacy /> },
      { path: '*', element: <Error404 /> },
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
