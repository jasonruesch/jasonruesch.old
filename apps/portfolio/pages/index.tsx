import Image from 'next/image';
import Link from 'next/link';

import { ChevronRightIcon } from '@heroicons/react/outline';

export function Index({ className }) {
  const isHome = true;

  return (
    <main
      className={`mx-auto flex h-screen max-w-screen-sm flex-col items-center justify-center space-y-4 p-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div
        className={`relative h-[150px] w-[150px] rounded-full ${
          isHome ? 'md:h-[300px] md:w-[300px]' : ''
        }`}
      >
        <Image
          priority
          src="/images/profile.png"
          className="bg-primary rounded-full"
          layout="fill"
          alt="Jason Ruesch"
        />
      </div>

      <h1 className="text-center font-heading text-4xl font-bold">
        Hi! I&apos;m
        <br />
        <span className="text-primary">Jason Ruesch</span>
        <br />
        and I am a<br />
        <span className="text-secondary">Software Engineer</span>
        <br />
        focusing on
        <br />
        Web Development and Design
      </h1>

      <div className="mx-auto w-24">
        <Link href="/about" scroll={false}>
          <a
            className="text-primary flex justify-end text-sm font-medium"
            aria-label="Learn more about me."
          >
            <ChevronRightIcon
              className="h-12 w-12 -translate-x-6"
              aria-hidden="true"
            />
          </a>
        </Link>
      </div>
    </main>
  );
}

export default Index;
