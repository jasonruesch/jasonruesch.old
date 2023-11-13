import { ProjectList } from '@jasonruesch/projects';
import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/projects" element={<ProjectList />} />
    </Routes>
  );
}

export default App;
