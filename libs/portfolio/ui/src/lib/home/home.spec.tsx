import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { Component } from './home';

describe('Home', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Component />, { wrapper: BrowserRouter });
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<Component />, { wrapper: BrowserRouter });
    expect(getByText(/Jason Ruesch/)).toBeTruthy();
  });
});
