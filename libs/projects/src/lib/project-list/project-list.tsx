import styles from './project-list.module.css';

/* eslint-disable-next-line */
export interface ProjectListProps {}

export function ProjectList(props: ProjectListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ProjectList!</h1>
    </div>
  );
}

export default ProjectList;
