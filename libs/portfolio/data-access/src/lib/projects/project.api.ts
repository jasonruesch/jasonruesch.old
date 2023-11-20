import { Project } from './project.model';

export async function getProjects(): Promise<Project[]> {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: 'one',
      name: 'Project One',
      description: 'Project One Description',
      tags: ['one'],
    },
    {
      id: 'two',
      name: 'Project Two',
      description: 'Project Two Description',
      tags: ['two'],
    },
    {
      id: 'three',
      name: 'Project Three',
      description: 'Project Three Description',
      tags: ['three'],
    },
  ];
}
