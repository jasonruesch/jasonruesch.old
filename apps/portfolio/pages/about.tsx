import Link from 'next/link';

export function About() {
  return (
    <main className="h-screen flex flex-col max-w-screen-sm mx-auto space-y-4 justify-center items-center px-4 sm:px-6 lg:px-8">
      <h1 className="font-heading font-bold text-4xl">About Me</h1>
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
