import Logo from '@/components/Logo';

export function LogoPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Logo className="mb-2 h-24 w-24  sm:h-32 sm:w-32" />
      <span className="font-display text-5xl font-bold sm:text-7xl">
        Jason Ruesch
      </span>
    </div>
  );
}

export default LogoPage;
