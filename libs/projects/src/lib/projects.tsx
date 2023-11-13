import styles from './projects.module.css';

/* eslint-disable-next-line */
export interface ProjectsProps {}

export function Projects(props: ProjectsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Projects!</h1>
    </div>
  );
}

export default Projects;
