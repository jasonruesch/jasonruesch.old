import Logo from '@/components/Logo';

export function LogoPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Logo className="mb-2 h-32 w-32" />
      <h1 className="font-display text-2xl font-bold lg:text-7xl">
        Jason Ruesch
      </h1>
    </div>
  );
}

export default LogoPage;
