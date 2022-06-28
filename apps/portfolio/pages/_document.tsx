import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="bg-background text-on-background h-full">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&amp;family=Alegreya+Sans+SC&amp;display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />

        {/* Global notification live region rendered permanently at the end of the document */}
        <div
          aria-live="assertive"
          className="sm-h:items-end sm-h:px-4 sm-h:py-6 pointer-events-none fixed inset-0 z-20 flex items-end px-4 py-6 sm:items-start sm:px-6 sm:py-20"
        >
          <div
            id="live"
            className="sm-h:items-center flex w-full flex-col items-center space-y-4 sm:items-end"
          >
            {/* Notification panel is dynamically inserted into this live region when it needs to be displayed */}
          </div>
        </div>
      </body>
    </Html>
  );
}
