import { Page, PageNavLink } from '@/components';
import { projects } from '@/data';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const ProjectPage = () => {
  const { projectId } = useParams();
  const projectIndex = projects.findIndex((p) => p.id === projectId);
  const project = projects[projectIndex];
  const previousProject = projects[projectIndex - 1];
  const nextProject = projects[projectIndex + 1];
  const navigate = useNavigate();

  useEffect(() => {
    if (!project) {
      navigate('/projects', { replace: true });
    }
  }, [project, navigate]);

  return (
    project && (
      <Page>
        <div className="min-h-full w-full max-w-4xl">
          <div className="mb-6">
            <PageNavLink
              to=".."
              className="inline-flex items-center gap-2 font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
            >
              <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
              <span>Back to projects</span>
            </PageNavLink>
          </div>

          <h1 className="flex items-center gap-2 font-display text-2xl font-medium sm:text-4xl">
            <div
              className={clsx(
                project.icon
                  ? 'bg-white shadow-md shadow-neutral-800/5 ring-1 ring-neutral-900/5 dark:border dark:border-neutral-700/50 dark:bg-neutral-800 dark:ring-0'
                  : '',
                'relative z-10 flex h-12 w-12 items-center justify-center rounded-full'
              )}
            >
              {project.icon}
            </div>
            {project.name}
          </h1>
          {project.link && (
            <small>
              <a
                href={project.link.href}
                className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
              >
                {project.link.name}
              </a>
            </small>
          )}
          <div className="mt-4 space-y-4 text-neutral-600 dark:text-neutral-400 lg:mt-8">
            <p className="relative z-10 mt-2 text-sm">{project.description}</p>
            <img
              src={project.imageUrl}
              alt={project.name}
              className="rounded-2xl"
            />
          </div>

          <div className="mt-6 flex items-center">
            <div className="flex-1">
              {previousProject?.id && (
                <PageNavLink
                  to={`../${previousProject.id}`}
                  className="inline-flex items-center gap-2 font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
                >
                  <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                  <span>Previous project</span>
                </PageNavLink>
              )}
            </div>

            <div className="flex flex-1 justify-end">
              {nextProject?.id && (
                <PageNavLink
                  to={`../${nextProject.id}`}
                  className="inline-flex items-center gap-2 font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
                >
                  <span>Next project</span>
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </PageNavLink>
              )}
            </div>
          </div>
        </div>
      </Page>
    )
  );
};
