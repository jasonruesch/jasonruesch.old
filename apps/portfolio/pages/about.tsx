import Link from 'next/link';

export function About() {
  return (
    <div className="mx-auto max-w-screen-sm space-y-4 text-sm sm:text-base">
      <h1 className="font-display text-center text-2xl font-bold sm:text-4xl">
        About Me
      </h1>
      <p>
        My name is Jason Ruesch. I am a software engineer, web developer, and
        designer currently living in Raleigh, NC. I enjoy creating software that
        not only looks amazing, but is also easy to use! I have a passion for
        learning new technologies and building things that are useful to others.
      </p>
      <p>
        Outside of work, I like to spend time with my family outdoors, play
        video games, and watch movies and tv shows. I also spend time tending to
        my urban farm, which includes chickens, dogs, cats and the constant flow
        of foster pets!
      </p>
      <p>
        I am always open to connect. If you are interested in learning more
        about me or how I can help you with your web needs, please reach out.
      </p>

      <div className="flex justify-center">
        <Link href="/contact">
          <a className="text-primary font-medium hover:text-cyan-600 dark:hover:text-violet-500">
            Get in touch
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      shouldShowProfileImage: true,
    },
  };
}

export default About;
