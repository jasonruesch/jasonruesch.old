import LogoImage from '@/components/LogoImage';

export function Logo() {
  return (
    <div className="sm-h:min-h-0 sm-h:pt-16 sm-h:pb-4 flex min-h-screen flex-col justify-center">
      <LogoImage className="sm-h:mt-4 mx-auto mb-2 h-24 w-24 sm:h-32 sm:w-32" />
      <span className="font-display text-center text-5xl font-bold sm:text-7xl">
        Jason Ruesch
      </span>
    </div>
  );
}

export default Logo;
