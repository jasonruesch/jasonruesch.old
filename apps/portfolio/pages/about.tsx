import Link from 'next/link';

export function About({ className }) {
  return (
    <>
      <h1 className="font-heading text-3xl font-bold sm:text-4xl">About Me</h1>
      <div className="mt-4 space-y-4">
        <p className="text-justify">
          My name is Jason Ruesch. I enjoy creating software that not only looks
          amazing, but is also easy to use! I have a passion for learning new
          technologies and building things that are useful to others.
        </p>
        <p className="text-justify">
          Outside of work, I like to spend time with my family, play video
          games, and watch movies and tv shows.
        </p>
        <p className="text-justify">
          I am always open to connect. If you are interested in learning more
          about me or how I can help you with your web needs, please reach out.
        </p>

        <div className="text-right">
          <Link href="/contact">
            <a className="text-link hover:text-link-hover font-medium">
              Get in touch
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default About;
