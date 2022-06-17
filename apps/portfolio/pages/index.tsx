import Link from 'next/link';

import { ChevronRightIcon } from '@heroicons/react/outline';

export function Index({ className }) {
  return (
    <>
      <h1 className="text-center font-heading text-3xl font-bold sm:text-4xl">
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

      <Link href="/about">
        <a
          className="text-link hover:text-link-hover mx-auto mt-4 flex w-24 justify-end text-sm font-medium"
          aria-label="Learn more about me"
        >
          <ChevronRightIcon
            className="h-12 w-12 -translate-x-6"
            aria-hidden="true"
          />
        </a>
      </Link>
    </>
  );
}

export default Index;
