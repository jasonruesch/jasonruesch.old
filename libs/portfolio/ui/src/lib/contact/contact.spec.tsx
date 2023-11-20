import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import Component from './contact';

describe('Contact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Component />, { wrapper: BrowserRouter });
    expect(baseElement).toBeTruthy();
  });
});
