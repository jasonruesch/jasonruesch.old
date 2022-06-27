import ProfileImage from '@/components/ProfileImage';

export function Index() {
  return (
    <div className="flex h-full flex-col justify-center">
      <ProfileImage className="mx-auto mb-4" isHome />
      <h1 className="font-display text-center text-2xl font-bold sm:text-4xl">
        Hi, I&apos;m
        <br />
        <div className="text-primary">Jason Ruesch</div>
        and I am a<br />
        <div className="text-secondary">Software Engineer</div>
        focusing on
        <br />
        Web Development and Design
      </h1>
    </div>
  );
}

/**
 * Example of forcing a theme on the page.
 */
// export async function getServerSideProps() {
//   return {
//     props: { theme: 'light' },
//   };
// }

export default Index;
