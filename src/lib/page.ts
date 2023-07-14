export interface Page {
  name: string;
  index: number;
  type: 'primary' | 'secondary';
}

export const pages = new Map<string, Page>([
  ['/', { name: 'Home', index: 0, type: 'primary' }],
  ['/about', { name: 'About', index: 1, type: 'primary' }],
  ['/contact', { name: 'Contact', index: 2, type: 'primary' }],
  ['/privacy', { name: 'Privacy', index: 3, type: 'secondary' }],
]);
