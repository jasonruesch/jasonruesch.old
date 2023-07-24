import easterEgg from '@/assets/easter-egg.png';
import { Page } from '@/components';

export const EasterEggPage = () => {
  // const { uid } = useParams<{ uid: string }>();
  // if (uid !== easterEggId) {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <Page transparent>
      <figure className="h-80">
        <img src={easterEgg} alt="Easter Egg" className="h-full" />
      </figure>
    </Page>
  );
};
