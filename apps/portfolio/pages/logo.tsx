import LogoImage from '@/components/LogoImage';

export function Logo() {
  return (
    <>
      <LogoImage className="mx-auto mb-2 h-24 w-24 sm:h-32 sm:w-32" />
      <h1 className="font-display text-center text-5xl font-bold sm:text-7xl">
        Jason Ruesch
      </h1>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { shouldCenter: true },
  };
}

export default Logo;
