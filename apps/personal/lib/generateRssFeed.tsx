import ReactDOMServer from 'react-dom/server';
import { Feed } from 'feed';
import { mkdir, writeFile } from 'fs/promises';
import * as path from 'path';

import { getAllArticles } from './getAllArticles';

export async function generateRssFeed() {
  const articles = await getAllArticles();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const author = {
    name: 'Jason Ruesch',
    email: 'jason@jasonruesch.dev',
  };

  const feed = new Feed({
    title: author.name,
    description: 'Your blog description',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
      json: `${siteUrl}/rss/feed.json`,
    },
  });

  for (const article of articles) {
    const url = `${siteUrl}/articles/${article.slug}`;
    const html = ReactDOMServer.renderToStaticMarkup(
      <article.component isRssFeed />
    );

    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      description: article.description,
      content: html,
      author: [author],
      contributor: [author],
      date: new Date(article.date),
    });
  }

  const cwd = path.join(process.cwd(), 'apps/personal/public');
  await mkdir(path.join(cwd, 'rss'), { recursive: true });
  await Promise.all([
    writeFile(path.join(cwd, 'rss', 'feed.xml'), feed.rss2(), 'utf8'),
    writeFile(path.join(cwd, 'rss', 'feed.json'), feed.json1(), 'utf8'),
  ]);
}
