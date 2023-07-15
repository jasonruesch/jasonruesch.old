// import clsx from 'clsx';
// import { useState } from 'react';
import easterEgg from '../../assets/easter-egg.png';

export function EasterEgg() {
  // const [showEgg, setShowEgg] = useState(true);

  return (
    <div className="h-80">
      {' '}
      {/* onClick={() => setShowEgg(!showEgg)}> */}
      <img
        src={easterEgg}
        alt="Easter Egg"
        // className={clsx(showEgg ? '' : 'invisible', 'h-80')}
        className="h-full"
      />
    </div>
  );
}

export default EasterEgg;
