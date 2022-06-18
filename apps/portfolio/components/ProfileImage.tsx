import Image from 'next/image';

export const ProfileImage = ({
  className,
  isHome = false,
}: {
  className?: string;
  isHome?: boolean;
}) => {
  return (
    <div
      className={`relative h-[150px] w-[150px] rounded-full ${
        isHome ? 'md:h-[300px] md:w-[300px]' : ''
      } ${className} ${isHome ? '' : 'sm-max-h:hidden'}`}
    >
      <Image
        priority
        src="/images/profile.png"
        className="bg-primary rounded-full"
        layout="fill"
        alt="Jason Ruesch"
      />
    </div>
  );
};

export default ProfileImage;
