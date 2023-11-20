import { Project, getProjects } from '@jasonruesch/portfolio-data-access';
import { Suspense } from 'react';
import { Await, Link, Params, useLoaderData } from 'react-router-dom';

export function loader({ params }: { params: Params<string> }) {
  const { id } = params;
  const project = getProjects().then((projects) =>
    projects.find((p) => p.id === id),
  );

  return { project };
}

export function Component() {
  const { project } = useLoaderData() as {
    project: Promise<Project | undefined>;
  };

  return (
    <div>
      <div className="mb-4">
        <Link to="/projects">Back to projects</Link>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Await
          resolve={project}
          errorElement={<div>Could not load project</div>}
        >
          {(project) => (
            <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

export default Component;

Component.displayName = 'Project';
