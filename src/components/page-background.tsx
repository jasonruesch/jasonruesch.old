export const PageBackground = () => {
  return (
    <>
      <div
        className="absolute top-16 transform-gpu overflow-hidden blur-3xl dark:hidden sm:top-1/4"
        aria-hidden="true"
      >
        <div
          className="relatives aspect-[678/1155] w-screen rotate-90 bg-gradient-to-tr from-fuchsia-500 to-cyan-500 opacity-30 sm:aspect-[1155/678] sm:rotate-45"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div
        className="absolute top-16 hidden transform-gpu overflow-hidden blur-3xl dark:flex sm:top-1/4"
        aria-hidden="true"
      >
        <div
          className="relative aspect-[632/1108] w-screen rotate-90 bg-gradient-to-r from-teal-500 to-violet-500 opacity-25 sm:aspect-[1108/632] sm:rotate-0"
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
        />
      </div>
    </>
  );
};
