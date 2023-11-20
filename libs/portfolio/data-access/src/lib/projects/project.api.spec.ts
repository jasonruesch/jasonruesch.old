import { getProjects } from './project.api';

describe('portfolioDataAccess', () => {
  it('should work', async () => {
    vi.mock('localforage', async () => {
      return {
        default: {
          getItem: async () => [
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
          ],
        },
      };
    });

    expect(await getProjects()).toEqual([
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
    ]);
  });
});
