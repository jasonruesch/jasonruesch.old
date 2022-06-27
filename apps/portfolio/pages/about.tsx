import ProfileImage from '@/components/ProfileImage';

export function About() {
  return (
    <div className="pt-16">
      <ProfileImage className="mx-auto mb-4" />
      <div className="mx-auto max-w-xl">
        <h1 className="font-display mb-4 text-center text-2xl font-bold sm:text-4xl">
          About Me
        </h1>
        <div className="space-y-4 text-sm sm:text-base">
          <p className="text-justify">
            My name is Jason Ruesch. I enjoy creating software that not only
            looks amazing, but is also easy to use! I have a passion for
            learning new technologies and building things that are useful to
            others.
          </p>
          <p className="text-justify">
            Outside of work, I like to spend time with my family, play video
            games, and watch movies and tv shows.
          </p>
          <p className="text-justify">
            I am always open to connect. If you are interested in learning more
            about me or how I can help you with your web needs, please reach
            out.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
