import { doAuth } from './auth';

describe('auth', () => {
  it('should work', () => {
    expect(doAuth()).toEqual({ success: true, name: 'Cheddar' });
  });
});
