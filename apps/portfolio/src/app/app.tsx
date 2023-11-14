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
            <div className="text-blue-500">
              <Link to="/projects">Projects</Link>
            </div>
          </>
        }
      />
      <Route path="/projects" element={<ProjectList />} />
    </Routes>
  );
}

export default App;
