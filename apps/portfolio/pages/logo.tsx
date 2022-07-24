import { Layout, LogoImage } from '@portfolio/ui';

export function Logo() {
  return (
    <Layout>
      <div>
        <LogoImage className="mx-auto mb-2 h-24 w-24 sm:h-36 sm:w-36" />
        <h1 className="text-center text-5xl sm:text-7xl">Jason Ruesch</h1>
      </div>
    </Layout>
  );
}

export default Logo;
