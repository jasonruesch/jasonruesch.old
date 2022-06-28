import { motion } from 'framer-motion';
import ProfileImage from '@/components/ProfileImage';

export function About() {
  return (
    <div className="pt-16 pb-4">
      <ProfileImage className="mx-auto my-4" />
      <motion.section
        layoutId="content"
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ ease: 'easeInOut' }}
      >
        <div className="mx-auto max-w-screen-sm">
          <h1 className="font-display mb-4 text-center text-2xl font-bold sm:text-4xl">
            About Me
          </h1>
          <div className="space-y-4 text-sm sm:text-base">
            <p>
              My name is Jason Ruesch. I am a software engineer, web developer,
              and designer currently living in Raleigh, NC. I enjoy creating
              software that not only looks amazing, but is also easy to use! I
              have a passion for learning new technologies and building things
              that are useful to others.
            </p>
            <p>
              Outside of work, I like to spend time with my family outdoors,
              play video games, and watch movies and tv shows. I also spend time
              tending to my urban farm, which includes chickens, dogs, cats and
              the constant flow of foster pets!
            </p>
            <p>
              I am always open to connect. If you are interested in learning
              more about me or how I can help you with your web needs, please
              reach out.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default About;
