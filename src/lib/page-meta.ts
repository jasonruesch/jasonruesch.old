import { easterEggId } from './utils';

export interface PageMeta {
  name: string;
  index: number;
  type?: 'primary' | 'secondary';
}

export const redirectPage: PageMeta = { name: 'Redirect', index: -2 };
export const easterEggPage: PageMeta = { name: 'Easter Egg', index: -1 };
export const homePage: PageMeta = {
  name: 'Home',
  index: 0,
  type: 'primary',
};
export const aboutPage: PageMeta = { name: 'About', index: 1, type: 'primary' };
export const projectsPage: PageMeta = {
  name: 'Projects',
  index: 2,
  type: 'primary',
};
export const contactPage: PageMeta = {
  name: 'Contact',
  index: 3,
  type: 'primary',
};
export const privacyPage: PageMeta = {
  name: 'Privacy Policy',
  index: 4,
  type: 'secondary',
};

export const pages = new Map<string, PageMeta>([
  ['/redirect', redirectPage],
  ['/easter-egg', easterEggPage],
  ['/', homePage],
  ['/about', aboutPage],
  ['/projects', projectsPage],
  ['/contact', contactPage],
  ['/privacy', privacyPage],
]);

export const isEasterEggPage = (path: string) =>
  path === `/easter-egg/${easterEggId}`;

export function getPage(path: string): PageMeta | undefined {
  return isEasterEggPage(path) ? easterEggPage : pages.get(path);
}

export function isCurrentPath(path: string, pathname: string): boolean {
  return (
    (path === '/' && pathname === '/') ||
    (path !== '/' && pathname.startsWith(path))
  );
}
