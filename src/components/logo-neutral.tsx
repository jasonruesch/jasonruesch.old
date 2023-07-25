import clsx from 'clsx';

export interface LogoNeutralProps {
  className?: string;
}

export const LogoNeutral = ({ className }: LogoNeutralProps) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      enableBackground="new 0 0 512 512"
      xmlSpace="preserve"
      className={clsx('pointer-events-none', className)}
    >
      <g transform="matrix(1.2613611714553135,0,0,1.2613611714553135,-8.234481943284555,-3.7538274755242695)">
        <g transform="translate(0,-957.3622)">
          <linearGradient
            id="gradientNeutral"
            gradientUnits="userSpaceOnUse"
            x1="-688.3126"
            y1="1339.5153"
            x2="-683.6619"
            y2="1339.5153"
            gradientTransform="matrix(100 0 0 -110.0909 68856.375 148631.7031)"
          >
            <stop
              offset="0"
              className="[stop-color:theme(colors.neutral.300)] dark:[stop-color:theme(colors.neutral.400)]"
            />
            <stop
              offset="1"
              className="[stop-color:theme(colors.neutral.500)] dark:[stop-color:theme(colors.neutral.600)]"
            />
          </linearGradient>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="url(#gradientNeutral)"
            d="M164.19,960.34c-2.63,0.21-10.64,13.6-28.9,50.99
              c-18.66,38.21-31.75,63.51-40.28,82c-69.83,28.96-102.9,26.28-24.33,63.37c6.92,3.26,13.43,6.22,19.65,8.94
              c0.05,0.13,0.09,0.24,0.15,0.36c-31.47,28.99-44.24,37.26,16,63.78c-0.03,0.41-0.09,0.7-0.13,1.1c9.82-0.72,18.69-1.84,21.41-4.24
              c3.7-3.27,4.9-6.89,5.42-14.1c-44.63-19.65-35.18-25.77-11.86-47.24c-0.04-0.09-0.06-0.18-0.1-0.27c-4.6-2.01-9.44-4.2-14.56-6.62
              c-58.2-27.47-33.71-25.48,18.02-46.93c6.31-13.7,16.01-32.45,29.84-60.75c2.22-4.54,3.92-7.9,5.75-11.52
              c-1.07-0.64-2.24-1.37-3.24-1.93c-0.57-0.82-1.11-1.69-1.6-2.67C149.73,1023.13,169.98,959.87,164.19,960.34z M291.72,994.68
              c-6.71-0.3-18.34,10.76-39.94,36.26c-1.15,1.35-2.07,2.55-3.18,3.87c-11.97-2.09-21.2-3.25-28.9-3.37
              c-17.32-0.26-26.97,4.89-42.59,16.82c-1.38-0.43-3.35-1.01-4.56-1.43c-0.56-0.35-1.04-0.66-1.59-1.01
              c-1.89,9.82-3.14,18.86-1.51,22.15c0.36,0.73,0.76,1.37,1.18,1.98c3.34,1.88,7.24,4.37,11.49,7.08c0.89,0.3,2.36,0.73,3.38,1.05
              c11.57-8.84,18.72-12.65,31.55-12.46c5.7,0.09,12.54,0.95,21.41,2.5c0.82-0.98,1.51-1.86,2.36-2.86
              c36.57-43.17,34.58-30.49,38.54,10.9c7.6,1.54,15.27,3.09,24.63,4.91c4.33,0.84,7.82,1.57,11.39,2.31c1.06-2.1,2.48-3.89,4.41-5.6
              c13.98-12.33,147.99,0,17.27-25.49c-12.62-2.46-22.98-4.57-33.24-6.64C300.81,1014.22,300.35,995.06,291.72,994.68z
              M312.61,1095.71c-9.82,0.72-18.69,1.84-21.41,4.24c-3.7,3.27-4.89,6.88-5.42,14.07c44.64,19.65,35.19,25.78,11.87,47.26
              c0.04,0.11,0.07,0.19,0.12,0.3c4.6,2.01,9.42,4.19,14.53,6.6c58.21,27.47,33.7,25.48-18.04,46.94
              c-6.31,13.71-15.95,32.4-29.79,60.73c-2.15,4.39-3.96,8.01-5.74,11.54c1.09,0.65,2.27,1.38,3.28,1.95
              c0.55,0.81,1.07,1.67,1.54,2.62c8.29,16.69-38.29,142.95,20.16,23.28c18.68-38.25,31.71-63.48,40.23-81.99
              c69.85-28.97,102.92-26.29,24.34-63.38c-6.9-3.26-13.41-6.2-19.61-8.91c-0.06-0.14-0.1-0.26-0.16-0.41
              c31.48-29,44.25-37.27-16.02-63.79C312.51,1096.38,312.57,1096.1,312.61,1095.71z M227.71,1102.21
              c-8.65,0.69-24.29,23.8-31.46,27.45c-7.64,3.89-38.88,2.55-41.53,10.71s23.39,25.44,27.28,33.08c3.89,7.64,2.55,38.88,10.71,41.53
              c8.16,2.65,25.44-23.39,33.08-27.28c7.64-3.89,38.88-2.55,41.53-10.71s-23.39-25.44-27.28-33.08s-2.55-38.88-10.71-41.53
              C228.83,1102.22,228.29,1102.17,227.71,1102.21z M103.59,1243.23c-1.06,2.1-2.48,3.89-4.41,5.6c-13.98,12.33-147.99,0-17.27,25.49
              c14.14,2.76,22.06,4.39,33.25,6.66c5.35,55.85,2.68,72.96,52.04,14.69c1.16-1.36,2.09-2.56,3.21-3.9
              c38.72,6.72,48.94,3.78,71.48-13.43c1.32,0.42,3.26,0.99,4.42,1.38c0.59,0.38,1.12,0.7,1.7,1.07c1.89-9.82,3.16-18.87,1.53-22.16
              c-0.35-0.71-0.73-1.34-1.14-1.94c-3.38-1.9-7.32-4.4-11.63-7.14c-0.86-0.29-2.3-0.71-3.28-1.03
              c-16.69,12.75-24.26,14.93-52.95,9.96c-0.83,0.99-1.52,1.87-2.37,2.88c-36.56,43.16-34.59,30.5-38.55-10.87
              c-8.3-1.68-14.16-2.89-24.63-4.93C110.65,1244.69,107.16,1243.96,103.59,1243.23z"
          />
        </g>
      </g>
    </svg>
  );
};
