export function Index() {
  return (
    <>
      <h1 className="font-display text-center text-2xl font-bold sm:text-4xl">
        Hi, I&apos;m
        <br />
        <div className="text-cyan-500 dark:text-violet-400">Jason Ruesch</div>
        and I am a<br />
        <div className="text-fuchsia-500 dark:text-teal-400">
          Software Engineer
        </div>
        focusing on
        <br />
        Web Development and Design
      </h1>
    </>
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
