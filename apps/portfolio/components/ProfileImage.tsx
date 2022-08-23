import clsx from 'clsx';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import profileImage from '../images/jasonruesch-512.png';
import profileDarkImage from '../images/jasonruesch-dark-512.png';

export interface ProfileImageProps {
  className?: string;
  large?: boolean;
}

export function ProfileImage({ className, large = false }: ProfileImageProps) {
  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(resolvedTheme === 'dark');

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  return (
    <figure
      className={clsx(
        'relative mx-auto mb-4 h-36 w-36 overflow-hidden rounded-full ring-1 ring-neutral-500 dark:ring-neutral-400',
        large ? 'sm:h-72 sm:w-72 sm:ring-2' : '',
        className
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
