import { act, render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import Component from './project';

describe('Project', () => {
  it('should render successfully', () => {
    vi.mock('react-router-dom', async () => {
      const actual = (await vi.importActual('react-router-dom')) as object;

      return {
        ...actual,
        useLoaderData: () => ({
          project: Promise.resolve({
            id: 'one',
            name: 'Project One',
            description: 'Project One Description',
            tags: ['React', 'TypeScript', 'Tailwind CSS'],
          }),
        }),
      };
    });

    act(() => {
      const { baseElement } = render(<Component />, { wrapper: BrowserRouter });
      expect(baseElement).toBeTruthy();
    });
  });
});
