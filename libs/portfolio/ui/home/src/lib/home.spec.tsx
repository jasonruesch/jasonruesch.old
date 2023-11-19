import { render } from '@testing-library/react';

import { Component } from './home';

describe('Home', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Component />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<Component />);
    expect(getByText(/Jason Ruesch/)).toBeTruthy();
  });
});
