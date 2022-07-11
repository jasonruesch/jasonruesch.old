import LogoImage from '@/components/LogoImage';

export function Logo() {
  return (
    <>
      <LogoImage className="mx-auto mb-2 h-24 w-24 sm:h-36 sm:w-36" />
      <h1 className="text-center text-5xl sm:text-7xl">Jason Ruesch</h1>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { shouldCenter: true },
  };
}

export default Logo;
