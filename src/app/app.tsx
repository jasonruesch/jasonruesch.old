import { Route, Routes } from 'react-router-dom';
import Home from './home/home';
import About from './about/about';
import Contact from './contact/contact';

export function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </main>
  );
}

export default App;
