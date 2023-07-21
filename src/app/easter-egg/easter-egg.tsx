import { Navigate, useParams } from 'react-router-dom';
import { easterEggId } from 'src/lib';
import easterEgg from '../../assets/easter-egg.png';

export function EasterEgg() {
  const { uid } = useParams<{ uid: string }>();
  if (uid !== easterEggId) {
    return <Navigate to="/" replace />;
  }

  return (
    <figure className="h-80">
      <img src={easterEgg} alt="Easter Egg" className="h-full" />
    </figure>
  );
}

export default EasterEgg;
