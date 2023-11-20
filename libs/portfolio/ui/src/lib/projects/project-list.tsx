import { Project, getProjects } from '@jasonruesch/portfolio-data-access';
import { Suspense } from 'react';
import { Await, Link, useLoaderData } from 'react-router-dom';

export function loader() {
  return {
    projects: getProjects(),
  };
}

export function Component() {
  const { projects } = useLoaderData() as { projects: Promise<Project[]> };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Projects</h1>
      <ul className="space-y-2">
        <Suspense fallback={<li>Loading...</li>}>
          <Await
            resolve={projects}
            errorElement={<li>Could not load projects</li>}
          >
            {(projects) =>
              projects.map((project: Project) => (
                <li key={project.id}>
                  <Link to={project.id}>{project.name}</Link>
                </li>
              ))
            }
          </Await>
        </Suspense>
      </ul>
    </div>
  );
}

export default Component;

Component.displayName = 'ProjectList';
