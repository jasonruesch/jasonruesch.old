import { Nav } from '@jasonruesch/shared/ui';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <>
      <Nav />
      <h1>Welcome to Home!</h1>
    </>
  );
}

export default Home;
