import { ProfileImage } from '../../components';

export function Home() {
  return (
    <div className="mx-auto w-full max-w-xl space-y-4 text-center">
      <ProfileImage large />

      <h1 className="font-display text-2xl font-medium text-neutral-500 dark:text-neutral-400 sm:text-4xl">
        Hi, I&apos;m
        <br />
        <span className="text-cyan-500 dark:text-violet-400">Jason Ruesch</span>
        <br />
        and I am a
        <br />
        <span className="text-neutral-900 dark:text-teal-400">
          Software Engineer
        </span>
        <br />
        with focus on
        <br />
        Web Development and Design
      </h1>
    </div>
  );
}

export default Home;
