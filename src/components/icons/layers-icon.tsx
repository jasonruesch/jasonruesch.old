interface LayersIconProps {
  className?: string;
}

export const LayersIcon = ({ className }: LayersIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    viewBox="0 0 100 100"
    className={className}
  >
    <path
      d="M28.135 10.357a3.5 3.5 0 0 0-2.668 1.235L.832 40.607a3.5 3.5 0 0 0 2.67 5.766l93-.064a3.5 3.5 0 0 0 2.666-5.766L74.59 11.592a3.5 3.5 0 0 0-2.668-1.235zm1.619 7H70.3l18.64 21.957-77.873.053zM89.91 51.313l-9.178.007 8.211 9.67-77.875.053 8.22-9.682-9.188.008L.832 62.283a3.5 3.5 0 0 0 2.67 5.766l93-.065a3.5 3.5 0 0 0 2.666-5.765zm0 21.593-9.178.008 8.211 9.67-77.875.053 8.22-9.682-9.188.008L.832 83.877a3.5 3.5 0 0 0 2.67 5.766l93-.065a3.5 3.5 0 0 0 2.666-5.766z"
      fill="currentColor"
    />
  </svg>
);
