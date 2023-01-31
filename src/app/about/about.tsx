import {
  LogoImageNeutral,
  ProfileImage,
  NavLink,
} from '@jasonruesch/shared/ui';

/* eslint-disable-next-line */
export interface AboutProps {}

export function About(props: AboutProps) {
  return (
    <div className="mx-auto grid h-full max-w-xl pt-16 pb-4 sm:place-items-center sm:py-20">
      <div className="w-full pt-6">
        <ProfileImage className="pb-4" />

        <h1>About Me</h1>
        <div className="mb-4 space-y-4">
          <p className="text-neutral-500 dark:text-neutral-400">
            My name is Jason Ruesch. I am a software engineer, web developer,
            and designer currently living in Raleigh, NC. I enjoy creating
            software that not only looks amazing, but is also engaging and easy
            to use! I have a passion for learning new technologies and building
            things that are useful to others.
          </p>
          <p className="text-neutral-500 dark:text-neutral-400">
            Outside of work, I like to spend time with my family outdoors, play
            video games, and watch movies and tv shows. I also spend time
            tending to my urban farm, which includes chickens, dogs, cats and
            the constant flow of foster pets!
          </p>
          <p className="text-neutral-500 dark:text-neutral-400">
            I am always open to connect. If you are interested in learning more
            about how I can help you with your web needs, please reach out.
          </p>
        </div>
        <NavLink
          to="/contact"
          className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
        >
          Get in touch
          <span aria-hidden="true"> &rarr;</span>
        </NavLink>

        <LogoImageNeutral className="mx-auto my-6 h-12 w-12" />
      </div>
    </div>
  );
}

export default About;
