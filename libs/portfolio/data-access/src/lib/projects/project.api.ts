import localforage from 'localforage';
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';
import { Project } from './project.model';

const defaultProjects = [
  {
    id: 'one',
    name: 'Project One',
    description: 'This is project one',
    tags: ['one'],
    createdAt: Date.now(),
  },
  {
    id: 'two',
    name: 'Project Two',
    description: 'This is project two',
    tags: ['two'],
    createdAt: Date.now(),
  },
  {
    id: 'three',
    name: 'Project Three',
    description: 'This is project three',
    tags: ['three'],
    createdAt: Date.now(),
  },
] satisfies Project[];

export async function getProjects(query?: string) {
  await fakeNetwork(`getProjects:${query}`);

  let projects = (await localforage.getItem('projects')) as Project[];

  if (!projects) projects = defaultProjects;

  if (query) {
    projects = matchSorter(projects, query, { keys: ['first', 'last'] });
  }

  return projects.sort(sortBy('last', 'createdAt'));
}

export async function createProject() {
  await fakeNetwork();

  const id = Math.random().toString(36).substring(2, 9);
  const project = {
    id,
    name: '',
    description: '',
    tags: [],
    createdAt: Date.now(),
  };

  const projects = await getProjects();
  projects.unshift(project);
  await set(projects);

  return project;
}

export async function getProject(id: string) {
  await fakeNetwork(`project:${id}`);

  const projects = (await localforage.getItem('projects')) as Project[];
  const project = projects.find((project) => project.id === id);

  return project ?? null;
}

export async function updateProject(id: string, updates: Project) {
  await fakeNetwork();

  const projects = (await localforage.getItem('projects')) as Project[];
  const project = projects.find((project) => project.id === id);

  if (!project) throw new Error(`No project found for ${id}`);

  Object.assign(project, updates);
  await set(projects);

  return project;
}

export async function deleteProject(id: string) {
  const projects = (await localforage.getItem('projects')) as Project[];
  const index = projects.findIndex((project) => project.id === id);

  if (index > -1) {
    projects.splice(index, 1);
    await set(projects);

    return true;
  }

  return false;
}

function set(projects: Project[]) {
  return localforage.setItem('projects', projects);
}

// fake a cache so we don't slow down stuff we've already seen
const fakeCache: { [key: string]: boolean } = {};

async function fakeNetwork(key?: string) {
  if (!key || fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;

  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
