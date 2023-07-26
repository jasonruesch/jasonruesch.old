import easterEgg from '@/assets/easter-egg.png';
import { Page } from '@/components';
import { easterEggId } from '@/lib';
import { Navigate, useParams } from 'react-router';

export const EasterEggPage = () => {
  const { uid } = useParams<{ uid: string }>();
  if (uid !== easterEggId) {
    return <Navigate to="/" replace />;
  }

  return (
    <Page transparent hideFooter>
      <div>
        <img src={easterEgg} alt="Easter Egg" className="h-full max-h-80" />
      </div>
    </Page>
  );
};
