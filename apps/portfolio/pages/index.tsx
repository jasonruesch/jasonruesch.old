import { ChevronRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export function Index() {
  return (
    <main className="flex h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
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

      <div className="mx-auto mt-4 w-24">
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
