import { eventBus } from './eventBus';

describe.skip('eventBus', () => {
  it('should be defined', () => {
    expect(eventBus.on).toBeDefined();
    expect(eventBus.dispatch).toBeDefined();
    expect(eventBus.remove).toBeDefined();
  });
});
