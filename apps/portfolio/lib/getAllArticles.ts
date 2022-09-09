import glob from 'fast-glob';
import * as path from 'path';

async function importArticle(articleFilename) {
  const { meta, default: component } = await import(
    `../pages/articles/${articleFilename}`
  );
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  };
}

export async function getAllArticles() {
  const cwd = path.join(process.cwd(), 'apps/portfolio/pages/articles');
  const articleFilenames = await glob(['*.mdx', '*/index.mdx'], { cwd });

  const articles = await Promise.all(articleFilenames.map(importArticle));

  return articles.sort(
    (a, z) => new Date(z.date).getTime() - new Date(a.date).getTime()
  );
}
