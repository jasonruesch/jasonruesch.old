import { Html, Head, Main, NextScript } from 'next/document';
import { appleDeviceSpecsForLaunchImages } from 'pwa-asset-generator';
import { Fragment } from 'react';

export default function Document() {
  return (
    <Html lang="en" className="dark scroll-pt-16 scroll-smooth sm:scroll-pt-20">
      <Head>
        <meta name="application-name" content="Jason Ruesch" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Jason Ruesch" />
        <meta name="description" content="Personal portfolio" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#262626" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#262626" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/touch-icon-ipad-retina.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#a78bfa"
        />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://jasonruesch.dev" />
        <meta name="twitter:title" content="Jason Ruesch" />
        <meta name="twitter:description" content="Personal portfolio" />
        <meta
          name="twitter:image"
          content="https://jasonruesch.dev/icons/android-chrome-192x192.png"
        />
        <meta name="twitter:creator" content="@JasonRuesch" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Jason Ruesch" />
        <meta property="og:description" content="Personal portfolio" />
        <meta property="og:site_name" content="Jason Ruesch" />
        <meta property="og:url" content="https://jasonruesch.dev" />
        <meta property="fb:app_id" content="263886926978895" />
        <meta
          property="og:image"
          content="https://jasonruesch.dev/images/opengraph.png"
        />

        {appleDeviceSpecsForLaunchImages.map((spec) => {
          return (
            <Fragment
              key={`apple-splash-portrait-${spec.portrait.width}-${spec.portrait.height}`}
            >
              <link
                rel="apple-touch-startup-image"
                href={`/splashscreens/apple-splash-${spec.portrait.width}-${spec.portrait.height}.jpg`}
                media={`(device-width: ${
                  spec.portrait.width / spec.scaleFactor
                }px) and (device-height: ${
                  spec.portrait.height / spec.scaleFactor
                }px) and (-webkit-device-pixel-ratio: ${
                  spec.scaleFactor
                }) and (orientation: portrait)`}
              />
              <link
                rel="apple-touch-startup-image"
                href={`/splashscreens/apple-splash-${spec.portrait.height}-${spec.portrait.width}.jpg`}
                media={`(device-width: ${
                  spec.portrait.height / spec.scaleFactor
                }px) and (device-height: ${
                  spec.portrait.width / spec.scaleFactor
                }px) and (-webkit-device-pixel-ratio: ${
                  spec.scaleFactor
                }) and (orientation: landscape)`}
              />
            </Fragment>
          );
        })}

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
      <body className="bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50">
        <Main />
        <NextScript />

        {/* Global notification live region rendered permanently at the end of the document */}
        <div
          aria-live="assertive"
          className="pointer-events-none fixed inset-0 z-20 flex items-end px-4 py-6 sm:items-start sm:px-6 sm:py-20"
        >
          <div
            id="live"
            className="flex w-full flex-col items-center space-y-4 sm:items-end"
          >
            {/* Notification panel is dynamically inserted into this live region when it needs to be displayed */}
          </div>
        </div>
      </body>
    </Html>
  );
}
