import Link from 'next/link';
import Head from 'next/head';
import { LogoImageNeutral } from '@jasonruesch/web/ui';
import { getAllArticles } from '../../lib/getAllArticles';
import { formatDate } from '../../lib/formatDate';

export default function Articles({ articles }) {
  return (
    <>
      <Head>
        <title>Articles - Jason Ruesch</title>
        <meta name="description" content="" />
      </Head>
      <div className="pt-16 pb-40">
        <div className="w-full pt-6">
          <div className="space-y-4">
            <h1>Articles</h1>
            {articles.map((article) => (
              <div key={article.slug} article={article}>
                <Link href={`/articles/${article.slug}`}>
                  <h3>{article.title}</h3>
                </Link>
                <small>{formatDate(article.date)}</small>
                <p>{article.description}</p>
              </div>
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 h-40 py-14">
            <LogoImageNeutral className="mx-auto h-12 w-12" />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
    },
  };
}
