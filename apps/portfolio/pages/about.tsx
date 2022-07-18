import Layout from '@/components/Layout';
import ProfileImage from '@/components/ProfileImage';
import Link from 'next/link';

export function About() {
  return (
    <Layout>
      <ProfileImage />

      <div className="mx-auto max-w-screen-sm space-y-4 text-sm sm:text-base">
        <h1 className="text-center">About Me</h1>
        <p className="text-neutral">
          My name is Jason Ruesch. I am a software engineer, web developer, and
          designer currently living in Raleigh, NC. I enjoy creating software
          that not only looks amazing, but is also easy to use! I have a passion
          for learning new technologies and building things that are useful to
          others.
        </p>
        <p className="text-neutral">
          Outside of work, I like to spend time with my family outdoors, play
          video games, and watch movies and tv shows. I also spend time tending
          to my urban farm, which includes chickens, dogs, cats and the constant
          flow of foster pets!
        </p>
        <p className="text-neutral">
          I am always open to connect. If you are interested in learning more
          about me or how I can help you with your web needs, please reach out.
        </p>

        <div className="flex justify-center">
          <Link href="/contact" scroll={false}>
            <a className="text-primary hover:text-primary-dark font-medium">
              Get in touch
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default About;
