import { Layout } from '@jasonruesch/shared-ui';
import { Outlet } from 'react-router';

export function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
