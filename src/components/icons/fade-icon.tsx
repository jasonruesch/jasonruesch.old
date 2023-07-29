interface FadeIconProps {
  className?: string;
}

export const FadeIcon = ({ className }: FadeIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    viewBox="0 0 32 32"
    className={className}
    fill="currentColor"
  >
    <path d="M8.24 25.14 7 26.67a13.79 13.79 0 0 0 4.18 2.44l.69-1.87a12 12 0 0 1-3.63-2.1ZM4.19 18l-2 .41A14.09 14.09 0 0 0 3.86 23l1.73-1a12.44 12.44 0 0 1-1.4-4ZM11.82 4.76l-.69-1.87A13.79 13.79 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1ZM5.59 10 3.86 9a14.37 14.37 0 0 0-1.64 4.59l2 .34A12.05 12.05 0 0 1 5.59 10ZM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28Z" />
    <path
      d="M0 0h32v32H0z"
      data-name="&lt;Transparent Rectangle&gt;"
      style={{
        fill: 'none',
      }}
    />
  </svg>
);
