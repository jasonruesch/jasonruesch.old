import { render } from '@testing-library/react';

import ProjectList from './project-list';

describe('ProjectList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProjectList />);
    expect(baseElement).toBeTruthy();
  });
});
