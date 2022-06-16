import Link from 'next/link';

export function About() {
  return (
    <main className="mx-auto flex h-screen max-w-screen-sm flex-col items-center justify-center space-y-4 px-4 sm:px-6 lg:px-8">
      <h1 className="font-heading text-4xl font-bold">About Me</h1>
      <p className="text-justify">
        My name is Jason Ruesch. I enjoy creating software that not only looks
        amazing, but is also easy to use! I have a passion for learning new
        technologies and building things that are useful to others.
      </p>
      <p className="text-justify">
        Outside of work, I like to spend time with my family, play video games,
        and watch movies and tv shows.
      </p>
      <p className="text-justify">
        I am always open to connect. If you are interested in learning more
        about me or how I can help you with your web needs, please reach out.
      </p>

      <div>
        <Link href="/contact" scroll={false}>
          <a className="text-primary font-medium">
            Get in touch
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </Link>
      </div>
    </main>
  );
}

export default About;
