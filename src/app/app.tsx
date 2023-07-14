import { ThemeProvider } from 'next-themes';
import { AnimatedOutlet } from '../lib';
import PageTransitions from './page-transitions';

export function App() {
  return (
    <ThemeProvider attribute="class">
      <PageTransitions>
        <AnimatedOutlet />
      </PageTransitions>
    </ThemeProvider>
  );
}

export default App;
