export interface Page {
  name: string;
  index: number;
  type?: 'primary' | 'secondary';
}

export const easterEggPage: Page = { name: 'Easter Egg', index: -1 };
export const homePage: Page = { name: 'Home', index: 0, type: 'primary' };
export const aboutPage: Page = { name: 'About', index: 1, type: 'primary' };
export const contactPage: Page = { name: 'Contact', index: 2, type: 'primary' };
export const privacyPage: Page = {
  name: 'Privacy',
  index: 3,
  type: 'secondary',
};

export const pages = new Map<string, Page>([
  ['/easter-egg', easterEggPage],
  ['/', homePage],
  ['/about', aboutPage],
  ['/contact', contactPage],
  ['/privacy', privacyPage],
]);
