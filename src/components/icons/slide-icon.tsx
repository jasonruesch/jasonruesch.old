interface SlideIconProps {
  className?: string;
}

export const SlideIcon = ({ className }: SlideIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-6 0 32 32"
    className={className}
    fill="currentColor"
  >
    <path d="M11.64 6.28c-.32.32-.32.84 0 1.2l5.44 5.44H.88c-.48 0-.84.36-.84.84s.36.84.84.84h18.2c.92 0 1.2-.72.56-1.36l-6.88-6.88c-.28-.4-.8-.4-1.12-.08zM.96 17.36c-.92 0-1.32.72-.56 1.48l6.84 6.84c.32.32.84.32 1.2 0 .16-.16.24-.36.24-.6s-.08-.44-.24-.6L3 19.04h16.2c.48 0 .84-.36.84-.84s-.36-.84-.84-.84H.96z" />
  </svg>
);
