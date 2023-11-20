import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import Component from './privacy';

describe('Privacy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Component />, { wrapper: BrowserRouter });
    expect(baseElement).toBeTruthy();
  });
});
