import Image from 'next/image';
import clsx from 'clsx';
import profileImage from '@/images/profile.png';

export default function ProfileImage({
  className,
  isHome = false,
}: {
  className?: string;
  isHome?: boolean;
}) {
  return (
    <div
      className={clsx(
        'bg-primary relative h-36 w-36 rounded-full',
        isHome ? 'sm-h:!h-36 sm-h:!w-36 sm:h-72 sm:w-72' : '',
        className
      )}
    >
      <Image
        src={profileImage}
        alt="Jason Ruesch"
        layout="fill"
        unoptimized
        priority
      />
    </div>
  );
}
