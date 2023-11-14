import { ProjectList } from '@jasonruesch/projects';
import { Link, Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1 className="text-4xl font-bold">Home</h1>
            <Link to="/projects">Projects</Link>
          </>
        }
      />
      <Route path="/projects" element={<ProjectList />} />
    </Routes>
  );
}

export default App;
