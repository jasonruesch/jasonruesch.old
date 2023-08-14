import { Page, PageNavLink } from '@/components';
import { projects } from '@/data';
import clsx from 'clsx';

export const ProjectListPage = () => {
  return (
    <Page>
      <div className="min-h-full w-full max-w-4xl">
        <h1 className="font-display text-2xl font-medium sm:text-4xl">
          My Projects
        </h1>
        <div className="mt-4 text-neutral-600 dark:text-neutral-400 lg:mt-8">
          <ul className="grid grid-cols-1 gap-x-12 gap-y-16 pt-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <li
                key={index}
                className="group relative flex flex-col items-start"
              >
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
                <h2 className="mt-6 text-base font-semibold text-neutral-800 dark:text-neutral-100">
                  <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-neutral-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-neutral-900/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                  <PageNavLink to={project.id}>
                    <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                    <span className="relative z-10">{project.name}</span>
                  </PageNavLink>
                </h2>
                <p className="relative z-10 mt-2 text-sm">{project.summary}</p>
                {project.link && (
                  <a
                    href={project.link.href}
                    className="relative z-20 mt-6 font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
                  >
                    {project.link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Page>
  );
};
