import { Page, PageNavLink, ProfileImage } from '@/components';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

export const AboutPage = () => {
  return (
    <Page>
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-2">
          <ProfileImage />
        </div>

        <h1 className="font-display text-2xl font-medium sm:text-4xl">
          About Me
        </h1>
        <div className="mt-4 space-y-4 text-neutral-600 dark:text-neutral-400 lg:mt-8">
          <p>
            Hello, I'm Jason Ruesch, a Senior Frontend Software Engineer with a
            passion for creating exceptional user experiences. Armed with a
            Bachelor of Science in Computer Science, I've dedicated my career to
            the dynamic world of web development, honing my skills in crafting
            intuitive and visually stunning interfaces.
          </p>
          <p>
            When I'm not immersed in code, I'm often found exploring the virtual
            realms of video games or catching up on the latest movies and TV
            shows. My love for technology doesn't end with my profession; I'm
            always excited to dive into the latest software development
            technologies, eager to stay at the forefront of this ever-evolving
            field.
          </p>
          <p>
            Beyond my professional pursuits, my family is my anchor, and
            spending quality time with them is incredibly important to me.
            Whether it's a weekend adventure or a cozy evening together, their
            support fuels my drive to excel in both my personal and professional
            life.
          </p>
          <p>
            Feel free to connect with me to discuss all things frontend
            development, share recommendations for must-watch shows, or to
            exchange thoughts on the latest gaming adventures. Let's explore the
            digital world together!
          </p>
        </div>

        <div className="mt-4">
          <PageNavLink
            to="/contact"
            className="inline-flex items-center gap-2 font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
          >
            <span>Get in touch</span>
            <ArrowRightIcon
              className="pointer-events-none h-4 w-4"
              aria-hidden="true"
            />
          </PageNavLink>
        </div>
      </div>
    </Page>
  );
};
