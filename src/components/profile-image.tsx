import profileImage from '@/assets/jasonruesch-512.png';
import profileDarkImage from '@/assets/jasonruesch-dark-512.png';
import clsx from 'clsx';
import { useTheme } from 'next-themes';

export interface ProfileImageProps {
  className?: string;
  large?: boolean;
}

export const ProfileImage = ({
  className,
  large = false,
}: ProfileImageProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <figure
      className={clsx(
        'relative mx-auto h-36 w-36 overflow-hidden rounded-full ring-1 ring-neutral-500 dark:ring-neutral-400',
        large ? 'sm:h-72 sm:w-72 sm:ring-2' : '',
        className
      )}
    >
      <img
        src={resolvedTheme === 'dark' ? profileDarkImage : profileImage}
        alt="Jason Ruesch"
      />
    </figure>
  );
};
