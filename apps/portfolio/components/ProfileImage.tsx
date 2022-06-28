import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function ProfileImage({
  className,
  isHome = false,
}: {
  className?: string;
  isHome?: boolean;
}) {
  return (
    <motion.figure
      layoutId="profile-image"
      className={clsx(
        'bg-primary relative h-36 w-36 rounded-full',
        isHome ? 'sm-h:!h-36 sm-h:!w-36 sm:h-72 sm:w-72' : '',
        className
      )}
    >
      <motion.img
        initial={{ rotate: -180 }}
        animate={{ rotate: 0 }}
        exit={{ rotate: 180 }}
        transition={{ duration: 0.3 }}
        src="/images/profile.png"
        alt="Jason Ruesch"
      />
    </motion.figure>
  );
}
