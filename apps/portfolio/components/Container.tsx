import { CSSProperties, forwardRef, MutableRefObject } from 'react';
import clsx from 'clsx';

const OuterContainer = forwardRef(function OuterContainer(
  {
    className,
    children,
    style,
    ...props
  }: {
    className?: string;
    children: React.ReactNode;
    style?: CSSProperties;
    [key: string]: unknown;
  },
  ref: MutableRefObject<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={clsx('sm:px-8', className)}
      style={style}
      {...props}
    >
      <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
    </div>
  );
});

const InnerContainer = forwardRef(function InnerContainer(
  {
    className,
    children,
    ...props
  }: { className?: string; children: React.ReactNode; [key: string]: unknown },
  ref: MutableRefObject<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  );
});

export const Container = forwardRef(function Container(
  {
    className,
    children,
    style,
    ...props
  }: {
    className?: string;
    children: React.ReactNode;
    style?: CSSProperties;
    [key: string]: unknown;
  },
  ref: MutableRefObject<HTMLDivElement>
) {
  return (
    <OuterContainer ref={ref} className={className} style={style} {...props}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  );
});

Container['Outer'] = OuterContainer;
Container['Inner'] = InnerContainer;
