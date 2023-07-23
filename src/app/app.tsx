import { AnimatedRoutes, Header } from '@/components';
import { BrowserRouter as Router } from 'react-router-dom';

export function App() {
  return (
    <Router>
      {/* <Background /> */}
      <Header />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
