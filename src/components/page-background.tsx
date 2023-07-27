export const PageBackground = () => {
  return (
    <>
      <div
        className="absolute -left-20 top-80 max-h-[calc(100vh-320px)] -rotate-45 transform-gpu overflow-hidden blur-3xl dark:hidden sm:left-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/3 rotate-[30deg] bg-gradient-to-tr from-fuchsia-500 to-cyan-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div
        className="absolute -left-40 top-80 hidden max-h-[calc(100vh-320px)] rotate-90 transform-gpu justify-center overflow-hidden blur-3xl dark:flex sm:left-1/4 sm:top-40 sm:max-h-[calc(100vh-160px)] sm:rotate-45"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[51.9375rem] flex-none bg-gradient-to-r from-teal-500 to-violet-500 opacity-25 sm:w-[69.25rem]"
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
        />
      </div>
    </>
  );
};
