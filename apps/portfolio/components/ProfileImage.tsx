import clsx from 'clsx';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import profileImage from '@portfolio/images/jasonruesch-512.png';
import profileDarkImage from '@portfolio/images/jasonruesch-dark-512.png';

export function ProfileImage({ large = false }: { large?: boolean }) {
  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(resolvedTheme === 'dark');

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  return (
    <figure
      className={clsx(
        'relative mx-auto mb-4 h-36 w-36 overflow-hidden rounded-full ring-2 ring-black/10 dark:ring-black',
        large ? 'sm:sm-min-h:h-72 sm:sm-min-h:w-72' : ''
      )}
    >
      <Image
        layout="fill"
        src={isDark ? profileDarkImage : profileImage}
        alt="Jason Ruesch"
        priority
      />
    </figure>
  );
}
