import { Page, PageNavLink, ProfileImage } from '@/components';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

export const AboutPage = () => {
  return (
    <Page>
      <div className="mx-auto w-full max-w-xl space-y-4">
        <ProfileImage />

        <h1 className="font-display text-2xl font-medium text-neutral-500 dark:text-neutral-400 sm:text-4xl">
          About Me
        </h1>
        <p>
          My name is Jason Ruesch. I am a software engineer, web developer, and
          designer currently living in Raleigh, NC. I enjoy creating software
          that not only looks amazing, but is also engaging and easy to use! I
          have a passion for learning new technologies and building things that
          are useful to others.
        </p>
        <p>
          Outside of work, I like to spend time with my family outdoors, play
          video games, and watch movies and tv shows. I also spend time tending
          to my urban farm, which includes chickens, dogs, cats and the constant
          flow of foster pets!
        </p>
        <p>
          I am always open to connect. If you are interested in learning more
          about how I can help you with your web development or design needs,
          please reach out.
        </p>

        <PageNavLink
          to="/contact"
          className="inline-block font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
        >
          Get in touch
          <ArrowRightIcon
            className="pointer-events-none ml-1 inline-block h-4 w-4"
            aria-hidden="true"
          />
        </PageNavLink>
      </div>
    </Page>
  );
};
