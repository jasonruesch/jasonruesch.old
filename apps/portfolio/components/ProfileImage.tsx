import Image from 'next/image';
import profileImage from '@/images/profile.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProfileImage({
  className,
  isHome = false,
}: {
  className?: string;
  isHome?: boolean;
}) {
  return (
    <div
      className={classNames(
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
